import * as React from "react";
import { 
    ReactElement,
    memo 
} from 'react';
import { isMobile } from 'react-device-detect'
import { PAGE_TEXT } from 'constants/profile-page'

import './profile-card.scss';


interface IProfileCardProps {
    readonly userProfile: IUserProfile
}

const ProfileCardInner: React.FC<IProfileCardProps> = ({
    userProfile
}: IProfileCardProps): ReactElement => {


    return (
        <>
            {isMobile ? (
                <></>
            )
            :
            (
                <div className={'profile-card F-C-SP'}>
                    <div className={'profile-card__main-info F-R-SP'}>
                        <section>
                            <div className={'profile-card__image'} >
                                <img 
                                    src={'img/default-image.png'} 
                                    alt={''}
                                    height={200}
                                    width={200} />
                            </div>
                            <div>{PAGE_TEXT.status + userProfile?.status}</div>
                        </section>
                        <section className={'profile-card__info'}>
                            <ul>
                                <li style={{fontSize: '3em'}}>
                                    {userProfile?.username}
                                </li>
                                <li>
                                    {PAGE_TEXT.first_name + userProfile?.first_name}
                                </li>
                                <li>
                                    {PAGE_TEXT.last_name + userProfile?.last_name}
                                </li>
                                <li>
                                    {PAGE_TEXT.balance + userProfile?.balance}
                                </li>
                            </ul>
                        </section>                        
                    </div>
                </div>
            )}  
        </>
    )
}

export const ProfileCard = memo(ProfileCardInner);
