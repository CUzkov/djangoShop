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
        dispatchItemFields({
            type: 'category',
            categoryTitle: event.target.value,
            categories: categoriesAndSubCaregories
        });
    }, [itemFields]);

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
                            placeholder={PAGE_TEXT.item_name_field} />
                        <hr/>
                        <div className={'create-item-page__select-button F-R-SP'}>
                            {PAGE_TEXT.item_category_field}
                            <select 
                                style={{width: '40%'}}  
                                //value={categoriesAndSubCaregories ? categoriesAndSubCaregories.data[itemFields.category].title : 'Загрузка'}
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
                                style={{width: '40%'}} >
                                {PAGE_TEXT.create_category}
                            </button>
                        </div>
                        <hr/>
                        <div className={'create-item-page__select-button F-R-SP'}>
                            {PAGE_TEXT.item_sub_category_field}
                            <select 
                                style={{width: '40%'}}>
                                <option value="">
                                    {

                                    }
                                </option>
                            </select>
                            <div />
                            <button
                                style={{width: '40%'}} >
                                {PAGE_TEXT.create_sub_category}
                            </button>
                        </div>
                        <hr/>
                        <input 
                            type={'text'} 
                            placeholder={PAGE_TEXT.item_level_field} />
                        <hr/>
                        <textarea
                            className={'create-item-page__description'}
                            placeholder={PAGE_TEXT.item_description_field} />
                        <hr/>
                        <input 
                            type={'text'} 
                            placeholder={PAGE_TEXT.item_price_field} />
                        <hr/>
                        <div className={'create-item-page__tags'}>
                            {PAGE_TEXT.item_tags_field}:
                            <div className={'create-item-page__tags-container'}>
                                {itemFields.tags?.map((tagObj, index) => (
                                    <div 
                                        className={
                                            classNames(
                                                'create-item-page__tag',
                                                { 'create-item-page__tag--selected':  itemFields.tags[index].isSelect},
                                            )}
                                        key={index}
                                        onClick={onClickTagCB(index)} >
                                        {tagObj.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}  
        </>
    )
}

export const CreateItemPage = memo(CreateItemPageInner);
