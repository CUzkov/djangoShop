import * as React from 'react';
import { ReactElement } from 'react';
import { isMobile } from 'react-device-detect'
import { ProfileCard } from 'components/profile-card'

import './profile-page.scss';


export const ProfilePage = (): ReactElement => {
    
    return (
        <>
            {isMobile ? (
                <></>
            )
            :
            (
                <div className={'profile-page__wrapper F-R-SP'}>
                    <div className={'profile-page__content F-R-SP'}>
                        <ProfileCard />
                        <div className={''}>

                        </div>
                    </div>
                </div>
            )}  
        </>
    )
}
