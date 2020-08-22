import * as React from "react";
import { ReactElement } from 'react';
import { isMobile } from 'react-device-detect'


import './login-bar.scss';


export const LoginBar = (): ReactElement => {
    
    

    return (
        <>
            {isMobile ? (
                <></>
            )
            :
            (
                <div className={'login-bar'}>

                </div>
            )}  
        </>
    )
}
