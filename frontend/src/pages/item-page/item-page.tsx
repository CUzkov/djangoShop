import * as React from 'react';
import { 
    ReactElement,
    memo,
    useEffect,
    useState,
    useCallback,
} from 'react';
import { APIGetContent } from '../../api/api'
import { Redirect } from 'react-router-dom'
import { PAGE_TEXT } from 'constants/item-page'

import './item-page.scss';

interface ItemPageProps {
    match: any,
}

const ItemPageInner: React.FC<ItemPageProps> = ({ 
    match 
}: ItemPageProps): ReactElement => {
    
    const [item, setItem] = useState<IItem>(null);
    const [isError, setIsError] = useState<boolean>(false);
    const [isRedirectToItems, setIsRedirectToItems] = useState<boolean>(false);

    const onClickReturnCB = useCallback(() => {
        setIsRedirectToItems(true);
    }, [isRedirectToItems]);

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
            <div className={'item-page__wrapper'}>
                <div className={'item-page__content F-R-SP'}>
                    <div className={'left-part'}>
                        <img 
                            src={'/img/default-image.png'} 
                            width={500}
                            height={500} />
                    </div>
                    <div className={'right-part F-C-SP'}>
                        <ul className={'item-info'}>
                            <li className={'title'}>{item?.name}</li>
                            <li>{item?.description}</li>
                            <li>{PAGE_TEXT.price + '  '}{item?.price}</li>
                            <ul className={'tags F-R-S'}>
                                {item?.tags.map((tag, index) => (
                                    <li 
                                        className={'tag'}
                                        key={index} >
                                            {tag}
                                    </li>
                                ))}
                            </ul>
                        </ul>
                        <div className={'buttons F-R-SP'}>
                            <input 
                                type={'button'} 
                                value={PAGE_TEXT.return}
                                onClick={onClickReturnCB} />
                            <input 
                                type={'button'} 
                                value={PAGE_TEXT.buy}
                                onClick={() => {}}
                                disabled={!(item ? item.is_for_sell : false)} />
                        </div>
                    </div>
                </div>
            </div>
            {isRedirectToItems &&
                <Redirect to={'/items'} push={true}/>
            }
        </>
    )
}

export const ItemPage = memo(ItemPageInner);
