import * as React from 'react';
import { 
    ReactElement,
    memo
} from 'react';
import { isMobile } from 'react-device-detect'
import { PAGE_TEXT } from 'constants/create-item-page'

import './create-item-page.scss';


const CreateItemPageInner = (): ReactElement => {
    
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

                            </div>
                        </div>
                    </div>
                </div>
            )}  
        </>
    )
}

export const CreateItemPage = memo(CreateItemPageInner);
