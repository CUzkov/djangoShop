import * as React from "react";
import { 
    ReactElement,
    memo,
} from 'react';
import { isMobile } from 'react-device-detect'
import { ITEM_CARD } from 'constants/items-page'

import './item-card.scss';


interface ItemCardProps {
    item: IItem,
}

const ItemCardInner: React.FC<ItemCardProps> = ({
    item
}: ItemCardProps): ReactElement => {


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
                    <div className={'title'}>{item.name}</div>
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
        </>
    )
}

export const ItemCard = memo(ItemCardInner)
