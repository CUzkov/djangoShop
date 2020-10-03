import * as React from "react";
import { 
    ReactElement, 
    useEffect,
    memo,
    useState,
} from 'react';
import { isMobile } from 'react-device-detect'
import { SideBar } from 'components/side-bar'
import { LoginBar } from 'components/login-bar'
import { ItemCard } from 'components/item-card'
import { APIGetContent } from 'api/api'

import './items-page.scss';


const ItemsPageInner = (): ReactElement => {
    
    const [items, setItems] = useState<IItem[]>([]);

    useEffect(() => {
        APIGetContent.getItems()
            .then((response) => {
                setItems(response.data);
            });
    }, []);


    return (
        <>
            {isMobile ? (
                <></>
            )
            :
            (
                <div className={'items-page__wrapper F-R-SP'}>
                    <SideBar />
                    <div className={'items-page__content'}>
                        {items?.map((item, index) => (
                            <div 
                                key={index} >
                                <ItemCard 
                                    item={item} />
                            </div>
                        ))}
                    </div>
                    <LoginBar />
                </div>
            )}  
        </>
    )
}

export const ItemsPage = memo(ItemsPageInner);