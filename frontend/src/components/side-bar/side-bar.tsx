import * as React from "react";
import { 
    ReactElement,
    useState,
    useEffect,
    memo
} from 'react';
import { isMobile } from 'react-device-detect'
import { DropDwonList } from 'components/dropdown-list'
import { APIGetContent } from '../../api/api'

import './side-bar.scss';


const SideBarInner = (): ReactElement => {
    
    const [sideBarContent, setSideBarContent] = useState<ISideBar>({});

    useEffect(():void => {
        APIGetContent.getSideBar()
            .then(response => setSideBarContent(response));
    }, []);

    
    return (
        <>
            {isMobile ? (
                <></>
            )
            :
            (
                <div className={'side-bar'}>
                    {
                        sideBarContent.data?.map((category, index):ReactElement => (
                            <DropDwonList category={category} key={index} />
                        ))
                    }
                </div>
            )}  
        </>
    )
}

export const SideBar = memo(SideBarInner);
