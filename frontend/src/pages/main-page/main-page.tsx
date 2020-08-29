import * as React from "react";
import { ReactElement, useState } from 'react';
import { isMobile } from 'react-device-detect'
import { Link } from 'react-router-dom'

import './main-page.scss';


export const MainPage = (): ReactElement => {

    return (
        <>
            {isMobile ? (
                <></>
            )
            :
            (
                <div className={'main-page__wrapper'}>
                    
                </div>
            )}  
        </>
    )
}
