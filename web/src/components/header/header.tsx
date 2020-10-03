import * as React from "react";
import { 
    ReactElement,
    useContext
} from 'react';
import { isMobile } from 'react-device-detect'
import { Link } from 'react-router-dom'
import { Context } from '../../contexts/app'

import './header.scss';


export const Header = (): ReactElement => {

    const {setJWTTokenCB, JWTToken} = useContext(Context);

    return (
        <>
            {isMobile ? (
                <></>
            )
            :
            (
                <header className={'header__wrapper'}>
                    <div className={'header__content F-R-SP'}>
                        <div className={'header__logo'}>
                            FlexShop
                        </div>
                        <nav className={'header__nav'}>
                            <ul className={'F-R-SP'}>
                                <li>
                                    <Link to={'/'} >
                                        Main
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/items'} >
                                        Items
                                    </Link>
                                </li>
                                <li>
                                    <Link to={JWTToken !== '' ? '/profile' : '/login'} >
                                        {JWTToken !== '' ?
                                            <span>Profile</span> : <span>Log in</span>
                                        }
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
            )}  
        </>
    )
}