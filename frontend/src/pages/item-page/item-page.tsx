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
            <div className={'item-page__wrapper'}>
                <div className={'item-page__content F-R-SP'}>
                    <div className={'left-part'}>
                        <img 
                            src={'/img/default-image.png'} 
                            width={500}
                            height={500} />
                    </div>
                    <div className={'right-part'}>
                        
                    </div>
                    {/* #{match.params.id} */}
                </div>
            </div>
        </>
    )
}

export const ItemPage = memo(ItemPageInner);
