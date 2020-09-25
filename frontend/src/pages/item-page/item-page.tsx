import * as React from 'react';
import { 
    ReactElement,
    memo,
} from 'react';
import { isMobile } from 'react-device-detect'

import './item-page.scss';

interface ItemPageProps {
    match: any,
}

const ItemPageInner: React.FC<ItemPageProps> = ({ 
    match 
}: ItemPageProps): ReactElement => {
    
    return (
        <>
            {isMobile ? (
                <></>
            )
            :
            (
                <div>
                    #{match.params.id}
                </div>
            )}
        </>
    )
}

export const ItemPage = memo(ItemPageInner);
