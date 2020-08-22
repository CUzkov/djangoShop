import * as React from "react";
import { ReactElement } from 'react';
import { isMobile } from 'react-device-detect'
import { Link } from 'react-router-dom'


import './items-page.scss';


export const ItemsPage = (): ReactElement => {
    
    return (
        <>
            {isMobile ? (
                <></>
            )
            :
            (
                <div className={'product-page__wrapper'}>
                    <button>
                        <Link to={'/itemsss'} />
                    </button>
                </div>
            )}  
        </>
    )
}
