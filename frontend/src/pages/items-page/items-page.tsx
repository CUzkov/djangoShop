import * as React from "react";
import { ReactElement } from 'react';
import { isMobile } from 'react-device-detect'
import { SideBar } from 'components/side-bar'
import { LoginBar } from 'components/login-bar'


import './items-page.scss';


export const ItemsPage = (): ReactElement => {
    


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
                    
                    </div>
                    <LoginBar />
                </div>
            )}  
        </>
    )
}
