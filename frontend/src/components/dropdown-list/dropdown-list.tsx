import * as React from "react";
import { 
    ReactElement,
    memo,
    useState,
    useCallback
} from 'react';
import { isMobile } from 'react-device-detect'

import './dropdown-list.scss';


interface DropDwonListProps {
    category: ICategory
}

const DropDwonListInner: React.FC<DropDwonListProps> = ({
    category
}: DropDwonListProps): ReactElement => {
    
    const [isDropped, setIsDropped] = useState<boolean>();

    const onClickCategory = useCallback(():void => {
        setIsDropped(!isDropped);
    }, [isDropped]);

    return (
        <>
            {isMobile ? (
                <></>
            )
            :
            (
                <div className={'dropdown-list'}>
                    <div className={'dropdown-list__category'}>
                        <div 
                            className={'dropdown-list__category-title'}
                            onClick={onClickCategory}
                            >
                            {category.title}
                        </div>
                        {isDropped && 
                            category.sub_categories?.map((sub_categoty, index):ReactElement => (
                                <div className={'dropdown-list__sub-category'} key={index}>
                                    <div className={'dropdown-list__sub-category-text'}>
                                        {sub_categoty.title}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )}  
        </>
    )
}

export const DropDwonList = memo(DropDwonListInner)
