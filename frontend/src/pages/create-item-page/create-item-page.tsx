import * as React from 'react';
import { 
    ReactElement,
    memo,
    useReducer,
    useEffect,
    useCallback,
    useState,
} from 'react';
import { isMobile } from 'react-device-detect'
import { PAGE_TEXT } from 'constants/create-item-page'
import { initialStateCreateItem, reducerCreateItem } from './reducers'
import { APIGetContent } from 'api/api'
import classNames from 'classnames'

import './create-item-page.scss';


const CreateItemPageInner = (): ReactElement => {
    
    const [itemFields, dispatchItemFields] = useReducer(reducerCreateItem, initialStateCreateItem);
    const [categoriesAndSubCaregories, setCategoriesAndSubCaregories] = useState<ISideBar>({});
    const [isShowCategoryCreate, setIsShowCategoryCreate] = useState<boolean>(true);
    const [isShowSubCategoryCreate, setIsShowSubCategoryCreate] = useState<boolean>(true);
    const [isCreatingTag, setIsCreatingTag] = useState<boolean>(false);
    const [createTagInput, setCreateTagInput] = useState<string>('');
    const [isCreateButtonDisable, setIsCreateButtonDisable] = useState<boolean>(true);

    const onlyNumberRegExp = /[^0-9]+/;
    

    useEffect(() => {

        APIGetContent.getTags()
            .then((response) => {            

                for(let key in response.data)
                {
                    response.data[key] = {...response.data[key], isSelect: false};
                }

                dispatchItemFields({
                    type: 'init-tags',
                    tags: response.data,
                });

            });

        APIGetContent.getCategoryAndSubCategory()
            .then((response) => {

                setCategoriesAndSubCaregories(response);

                dispatchItemFields({
                    type: 'refresh-categories',
                    categoryId: response.data[0].id,
                    subCategoryId: response.data[0].sub_categories[0].id,
                });

            });

    }, []);

    const onClickTagCB = useCallback((tagIndex: number, isNew: boolean = false) =>
        (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

            if(isNew) {
                dispatchItemFields({
                    type: 'new_tag_select',
                    tagIndex: tagIndex,
                });
            }
            else
            {
                dispatchItemFields({
                    type: 'tag',
                    tagIndex: tagIndex,
                });
            }
     
    }, [itemFields]);

    const onChangeCategorySelectCB = useCallback((event) => {
        dispatchItemFields({
            type: 'category',
            'categoryId': event.target.value,
            'subCategoryId': isShowSubCategoryCreate ? 
                categoriesAndSubCaregories.data[event.target.value - 1].sub_categories[0].id || -1
                :
                -1,
        });
    }, [itemFields, categoriesAndSubCaregories]);

    const onChangeSubCategotySelectCB = useCallback((event) => {
        dispatchItemFields({
            type: 'sub_category',
            subСategoryId: Number(event.target.value),
        });
    }, [itemFields]);

    const onClickCreateCategoryCB = useCallback(() => {
        setIsShowCategoryCreate(false);
        setIsShowSubCategoryCreate(false);
        dispatchItemFields({
            type: 'click_create_category',
        });
    }, [isShowCategoryCreate, isShowSubCategoryCreate]);

    const onClickCreateSubCategoryCB = useCallback(() => {
        setIsShowSubCategoryCreate(false);
        dispatchItemFields({
            type: 'click_create_sub_category'
        });
    }, [isShowSubCategoryCreate]);

    const onClickOrSelectCategoryCB = useCallback(() => {
        setIsShowCategoryCreate(true);
        setIsShowSubCategoryCreate(true);
        dispatchItemFields({
            type: 'refresh-categories',
            categoryId: categoriesAndSubCaregories.data[0].id,
            subCategoryId: categoriesAndSubCaregories.data[0].sub_categories[0].id,
        });
    }, [isShowCategoryCreate, isShowSubCategoryCreate]);

    const onChangeTextInput = useCallback((fieldName: string) => (event) => {
        dispatchItemFields({
            type: fieldName,
            [fieldName]: event.target.value,
        });
    }, [itemFields]);

    const onChangePrice = useCallback((event) => {

        if(!onlyNumberRegExp.test(event.target.value)) {
            dispatchItemFields({
                type: 'price',
                "price": Number(event.target.value),
            });
        }

    }, [itemFields]);

    const onClickCreateTag = useCallback(() => {
        setIsCreatingTag(!isCreatingTag);
    }, [isCreatingTag]);

    const onClickCreateTagInput = useCallback((event) => {
        event.stopPropagation();
    }, [isCreatingTag]);

    const onCLickCreateTagButton = useCallback((event) => {
        
        event.stopPropagation();

        dispatchItemFields({
            type: 'new_tag',
            "new_tag": createTagInput,
        });

        setCreateTagInput('');

    }, [isCreatingTag, createTagInput]);

    const onChangeCreateTagInput = useCallback((event) => {
        setCreateTagInput(event.target.value);
    }, [createTagInput]);

    const onClickCreateTagCancel = useCallback((event) => {

        event.stopPropagation();
        setIsCreatingTag(false);
        setCreateTagInput('');
        
    }, [isCreatingTag, createTagInput]);

    const onChangeNewCategoryInput = useCallback((event) => {
        dispatchItemFields({
            type: 'new_category',
            new_category: event.target.value,
        });
    }, [itemFields]);

    const onChangeNewSubCategoryInput = useCallback((event) => {
        dispatchItemFields({
            type: 'new_sub_category',
            new_sub_category: event.target.value,
        });
    }, [itemFields]);

    const sendDataCB = useCallback(() => {

        let state = itemFields;

        state.tags = [];

        itemFields.tags.map((tag) => {
            if(tag.isSelect) {
                state.tags.push(tag.id);
            }
        });

        APIGetContent.postItemCreate(state)
            .then((response) => {
                console.log(response);
            });

    }, [itemFields]);

    useEffect(() => {
        if(
            itemFields.name &&
            itemFields.price
        ) { setIsCreateButtonDisable(false); }
        else { setIsCreateButtonDisable(true); }
    });

    console.log(itemFields)


    return (
        <>
            {isMobile ? (
                <></>
            )
            :
            (
                <div className={'create-item-page__wrapper F-R-SP'}>
                    <div className={'create-item-page__content F-C-S'}>
                        <div className={'create-item-page__title'}>{PAGE_TEXT.title}</div>
                        <hr/>
                        <input 
                            type={'text'} 
                            placeholder={PAGE_TEXT.item_name_field}
                            onChange={onChangeTextInput('name')}
                            value={itemFields.name} />
                        <hr/>
                        {isShowCategoryCreate ? (
                            <div className={'create-item-page__select-button F-R-SP'}>
                                {PAGE_TEXT.item_category_field}
                                <select 
                                    style={{width: '40%'}}  
                                    value={itemFields.category.id}
                                    onChange={onChangeCategorySelectCB} >
                                    {categoriesAndSubCaregories.data?.map((category: ICategory, index: number) => (
                                        <option 
                                            value={category.id}
                                            key={index} >
                                            {category.title}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    style={{width: '40%'}}
                                    onClick={onClickCreateCategoryCB} >
                                    {PAGE_TEXT.create_category}
                                </button>
                            </div>
                        )
                        :
                        (
                            <div className={'F-R-SP'}>
                                <input 
                                    type={'text'} 
                                    style={{width: '40%'}}
                                    placeholder={PAGE_TEXT.create_category_placeholder}
                                    value={itemFields.category.new_title}
                                    onChange={onChangeNewCategoryInput} />
                                <button
                                    style={{width: '40%'}}
                                    onClick={onClickOrSelectCategoryCB} >
                                        {PAGE_TEXT.or_select}
                                </button>
                            </div>
                        )}
                        <hr/>
                        {isShowSubCategoryCreate ? (
                            <div className={'create-item-page__select-button F-R-SP'}>
                                {PAGE_TEXT.item_sub_category_field}
                                <select 
                                    style={{width: '40%'}}
                                    onChange={onChangeSubCategotySelectCB}
                                    value={itemFields.category.sub_category.id} >
                                        {categoriesAndSubCaregories.data &&
                                            categoriesAndSubCaregories
                                                .data[itemFields.category.id - 1]
                                                .sub_categories
                                                ?.map((subCategoty: ISubCategory, index: number) => (
                                                    <option
                                                        value={subCategoty.id} 
                                                        key={index} >
                                                        {subCategoty.title}
                                                    </option>
                                        ))}
                                </select>
                                <button
                                    style={{width: '40%'}}
                                    onClick={onClickCreateSubCategoryCB} >
                                    {PAGE_TEXT.create_sub_category}
                                </button>
                            </div>
                        )
                        :
                        (
                            <div className={'F-R-SP'}>
                                <input 
                                    type={'text'} 
                                    style={{width: '40%'}}
                                    placeholder={PAGE_TEXT.create_sub_category_placeholder}
                                    value={itemFields.category.sub_category.new_title}
                                    onChange={onChangeNewSubCategoryInput} />
                                <button
                                    style={{width: '40%'}}
                                    onClick={onClickOrSelectCategoryCB} >
                                    {PAGE_TEXT.or_select}
                                </button>
                            </div>
                        )}
                        <hr/>
                        <input 
                            type={'text'} 
                            placeholder={PAGE_TEXT.item_level_field}
                            disabled={true} />
                        <hr/>
                        <textarea
                            onChange={onChangeTextInput('description')}
                            className={'create-item-page__description'}
                            placeholder={PAGE_TEXT.item_description_field}
                            value={itemFields.description} />
                        <hr/>
                        <div>{PAGE_TEXT.item_price_field}:</div>
                        <input 
                            type={'text'} 
                            onChange={onChangePrice}
                            value={itemFields.price} />
                        <hr/>
                        <div className={'create-item-page__tags'}>
                            {PAGE_TEXT.item_tags_field}:
                            <div className={'create-item-page__tags-container'}>
                                {itemFields.tags?.map((tagObj, index) => (
                                    <div 
                                        className={
                                            classNames(
                                                'create-item-page__tag',
                                                { 'create-item-page__tag--selected':  itemFields.tags[index].isSelect },
                                            )}
                                        key={index}
                                        onClick={onClickTagCB(index)} >
                                        {tagObj.name}
                                    </div>
                                ))}
                                {itemFields.new_tags?.map((tagObj, index) => (
                                    <div
                                        className={
                                            classNames(
                                                'create-item-page__tag',
                                                { 'create-item-page__tag--selected':  itemFields.new_tags[index].isSelect },
                                            )}
                                            key={index}
                                            onClick={onClickTagCB(index, true)} >
                                        {tagObj.name}
                                    </div>
                                ))}
                                {isCreatingTag ? (
                                    <div
                                        className={'create-item-page__tag'}
                                        onClick={onClickCreateTag} >
                                            <input 
                                                className={'create-item-page__craete-tag_input'}
                                                onClick={onClickCreateTagInput}
                                                type="text"
                                                value={createTagInput}
                                                onChange={onChangeCreateTagInput} />
                                            <button
                                                onClick={onCLickCreateTagButton} >
                                                {PAGE_TEXT.create_tag_button}
                                            </button>
                                            <button
                                                onClick={onClickCreateTagCancel} >
                                                {PAGE_TEXT.cancel}
                                            </button>
                                    </div>
                                )
                                :
                                (
                                    <div 
                                        className={'create-item-page__tag'}
                                        onClick={onClickCreateTag} >
                                        {PAGE_TEXT.create_tag}
                                    </div>
                                )}
                            </div>
                        </div>
                        <input 
                            type={'button'}
                            disabled={isCreateButtonDisable}
                            value={PAGE_TEXT.create_item}
                            onClick={sendDataCB} />
                    </div>
                </div>
            )}  
        </>
    )
}

export const CreateItemPage = memo(CreateItemPageInner);
