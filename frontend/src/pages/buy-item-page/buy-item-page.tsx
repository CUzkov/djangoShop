import { Context } from '../../contexts/app';
import * as React from 'react';
import { 
    ReactElement,
    memo,
    useContext,
    useEffect,
    useState,
} from 'react';
import { ItemCard } from 'components/item-card'
import { APIGetContent } from '../../api/api'

import './buy-item-page.scss';
import { PAGE_TEXT } from 'constants/buy-item-page';


interface BuyItemPageProps {
    match: any,
}

const BuyItemPageInner: React.FC<BuyItemPageProps> = ({
    match
}: BuyItemPageProps): ReactElement => {
    
    const { UID } = useContext(Context);
    const [item, setItem] = useState<IItem>(null);
    const [isError, setIsError] = useState<boolean>(false);

    console.log(match.params.id)

    useEffect(() => {
        APIGetContent.getItems(match.params.id)
            .then((response) => {
                if(response.data) {
                    setItem(response.data);
                }
                else { setIsError(true); }
            });
    }, []);


    return (
        <>               
            {UID !== -1 ? (
                <div>
                    Please login
                </div>
            )
            :
            (
                <div className={'create-item-page__wrapper F-R-SP'}>
                    <div className={'create-item-page__content F-R-S'}>
                        {item &&
                            <ItemCard item={item} />
                        }
                        <div className={'left-part F-C-SP'}>
                            <div className={'title'}>
                                {PAGE_TEXT.order_title}
                            </div>
                            <div className={'buttons F-R-SP'}>
                                <input
                                    type={'button'}
                                    value={PAGE_TEXT.return} />
                                <input
                                    type={'button'}
                                    value={PAGE_TEXT.confirm_order} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export const BuyItemPage = memo(BuyItemPageInner);
