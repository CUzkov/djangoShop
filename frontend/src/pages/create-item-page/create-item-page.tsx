import * as React from 'react';
import { 
    ReactElement,
    memo,
    useReducer,
    useEffect,
    useState
} from 'react';
import { isMobile } from 'react-device-detect'
import { PAGE_TEXT } from 'constants/create-item-page'
import { initialStateCreateItem, reducerCreateItem } from './reducers'
import { APIGetContent } from 'api/api'
import classNames from 'classnames'

import './create-item-page.scss';


const CreateItemPageInner = (): ReactElement => {
    
    const [itemFields, dispatchItemFields] = useReducer(reducerCreateItem, initialStateCreateItem);
    const [tags, setTags] = useState<{
        "id": number,
        "name": string,
    }[]>(null);

    useEffect(() => {

        APIGetContent.getTags()
            .then((response) => {
                setTags(response.data);

                dispatchItemFields({
                    type: 'tag',
                });

            });

    }, []);

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
                        <input 
                            type={'text'} 
                            placeholder={PAGE_TEXT.item_category_field} />
                        <hr/>
                        <input 
                            type={'text'} 
                            placeholder={PAGE_TEXT.item_sub_category_field} />
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
                                {tags?.map((tagObj, index) => (
                                    <div 
                                        className={
                                            classNames(
                                                'create-item-page__tag',
                                                { 'create-item-page__tag--selected':  itemFields.tags[index]},
                                            )}
                                        key={index} >
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
