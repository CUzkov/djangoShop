import * as React from 'react';
import { 
    ReactElement,
    memo,
    useReducer,
    useEffect,
    useCallback,
    useState,
} from 'react';
import { isMobile, isMobileOnly } from 'react-device-detect'
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
    const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1);
    const [isCreatingTag, setIsCreatingTag] = useState<boolean>(false);

    const onlyNumberRegExp = /[^0-9]+/;


    useEffect(() => {

        APIGetContent.getTags()
            .then((response) => {            

                for(let key in response.data)
                {
                    response.data[key] = {...response.data[key], isSelect: false};
                }

                dispatchItemFields({
                    type: 'all-tags',
                    tags: response.data,
                });

            });

        APIGetContent.getCategoryAndSubCategory()
            .then((response) => {
                setCategoriesAndSubCaregories(response);
            });

    }, []);

    const onClickTagCB = useCallback((tagIndex: number) =>
        (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            dispatchItemFields({
                type: 'tag',
                tagIndex: tagIndex,
            });

    }, [itemFields]);

    const onChangeCategorySelectCB = useCallback((event) => {

        setSelectedCategoryId(event.target.value);

        dispatchItemFields({
            type: 'sub_category',
            sub_categoryId: categoriesAndSubCaregories.data[event.target.value - 1].sub_categories[0].id || -1,
        });

    }, [selectedCategoryId, categoriesAndSubCaregories]);

    const onChangeSubCategotySelectCB = useCallback((event) => {
        dispatchItemFields({
            type: 'sub_category',
            sub_categoryId: Number(event.target.value),
        });
    }, [itemFields]);

    const onClickCreateCategoryCB = useCallback(() => {
        setIsShowCategoryCreate(false);
        setIsShowSubCategoryCreate(false);
    }, [isShowCategoryCreate, isShowSubCategoryCreate]);

    const onClickCreateSubCategoryCB = useCallback(() => {
        setIsShowSubCategoryCreate(false);
    }, [isShowSubCategoryCreate]);

    const onClickOrSelectCategoryCB = useCallback(() => {
        setIsShowCategoryCreate(true);
        setIsShowSubCategoryCreate(true);
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

    const onCLickCreateTagButton = useCallback(() => {
        event.stopPropagation();

    }, [isCreatingTag]);

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
                        {isShowCategoryCreate && typeof(itemFields.sub_category) === typeof(0) ? (
                            <div className={'create-item-page__select-button F-R-SP'}>
                                {PAGE_TEXT.item_category_field}
                                <select 
                                    style={{width: '40%'}}  
                                    value={selectedCategoryId}
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
                                    placeholder={PAGE_TEXT.create_category_placeholder} />
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
                                    value={itemFields.sub_category} >
                                    {categoriesAndSubCaregories.data &&
                                        categoriesAndSubCaregories
                                            .data[selectedCategoryId - 1]
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
                                    placeholder={PAGE_TEXT.create_sub_category_placeholder} />
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
                            className={'create-item-page__description'}
                            placeholder={PAGE_TEXT.item_description_field}
                            onChange={onChangeTextInput('description')}
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
                                {isCreatingTag ? (
                                    <div
                                        className={'create-item-page__tag'}
                                        onClick={onClickCreateTag} >
                                            <input 
                                                className={'create-item-page__craete-tag_input'}
                                                onClick={onClickCreateTagInput}
                                                type="text" />
                                            <button
                                                onClick={} >
                                                {PAGE_TEXT.create_tag_button}
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
                    </div>
                </div>
            )}  
        </>
    )
}

export const CreateItemPage = memo(CreateItemPageInner);
