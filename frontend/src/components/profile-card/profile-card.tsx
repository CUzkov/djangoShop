import * as React from "react";
import { ReactElement } from 'react';
import { isMobile } from 'react-device-detect'
import { APIGetContent } from '../../api/api'

import './profile-card.scss';


export const ProfileCard = (): ReactElement => {

    const onClickDiv = () => {
        
        APIGetContent.getUser()
            .then((response) => {
                console.log(response)
            });

    }

    return (
        <>
            {isMobile ? (
                <></>
            )
            :
            (
                <div className={'profile-card F-C-SP'}>
                    <div className={'profile-card__main-info F-R-SP'}>
                        <div className={'profile-card__image'} onClick={onClickDiv}>

                        </div>
                    </div>
                    <div className={'profile-card__add-info'}>

                    </div>
                </div>
            )}  
        </>
    )
}