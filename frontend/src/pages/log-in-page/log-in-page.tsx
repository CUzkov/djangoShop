import * as React from "react";
import { ReactElement } from 'react';
import { isMobile } from 'react-device-detect'


import './log-in-page.scss';


export const LogInPage = (): ReactElement => {
    
    return (
        <>
            {isMobile ? (
                <></>
            )
            :
            (
                <div className={'log-in-page__wrapper'}>

                </div>
            )}  
        </>
    )
}
