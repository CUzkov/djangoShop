import * as React from "react";
import { 
    ReactElement,
    memo,
    useState,
    useCallback,
} from 'react';
import { isMobile } from 'react-device-detect'
import { ITEM_CARD } from 'constants/items-page'
import { Redirect } from 'react-router-dom';

import './item-card.scss';


interface ItemCardProps {
    item: IItem,
}

const ItemCardInner: React.FC<ItemCardProps> = ({
    item
}: ItemCardProps): ReactElement => {

    const [isRedirectToItemPage, setIsRedirectToItemPage] = useState<boolean>(false);

    const onclickItemName = useCallback(():void => {
        setIsRedirectToItemPage(true);
    }, [isRedirectToItemPage]);


    return (
        <>
            {isMobile ? (
                <></>
            )
            :
            (
                <div className={'item-card'}>
                    <img 
                        src={'img/default-image.png'} 
                        alt={''}
                        width={200}
                        height={200} />
                    <div 
                        className={'title'}
                        onClick={onclickItemName} >
                        {item.name}
                    </div>
                    <div className={'description'}>
                        <div style={{whiteSpace: 'pre'}}>{ITEM_CARD.description}</div>
                        {item.description.length >= 100 ? 
                            item.description.slice(0, 100) + '...' :
                            item.description    
                        }
                    </div>
                    <div className={'tags'}>
                        {item.tags.map((tag, index) => (
                            <div 
                                key={index} 
                                className={'tag'} >
                                {tag}</div>
                        ))}
                    </div>
                </div>
            )} 
            {isRedirectToItemPage &&
                <Redirect to={`/items/${item.id}`} push={true} />
            }
        </>
    )
}

export const ItemCard = memo(ItemCardInner)
