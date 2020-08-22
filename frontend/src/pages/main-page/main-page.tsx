import * as React from "react";
import { ReactElement } from 'react';
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
                    <div className={'linkk'}>
                        <Link to={'/items'} />
                        <a className="nav-item nav-link" href="/itemsss">CREATE CUSTOMER</a>
                    </div>
                </div>
            )}  
        </>
    )
}
