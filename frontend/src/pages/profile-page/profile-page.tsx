import * as React from 'react';
import { 
    ReactElement,
    useEffect,
    useState,
    memo,
    useCallback,
    useContext,
} from 'react';
import { isMobile } from 'react-device-detect'
import { ProfileCard } from 'components/profile-card'
import { APIGetContent } from 'api/api'
import { BUTTONS_TEXT } from 'constants/profile-page'
import { Redirect } from 'react-router-dom'
import { Context } from '../../contexts/app'


import './profile-page.scss';


const ProfilePageInner = (): ReactElement => {
    
    const [userProfile, setUserProfile] = useState(null);
    const [isRedirectToCreateItemPage, setIsRedirectToCreateItemPage] = useState<boolean>(false);
    const [isRedirectToLoginPage, setIsRedirectToLoginPage] = useState<boolean>(false);
    const {setJWTTokenCB, JWTToken} = useContext(Context);

    const onClickCreteItemButtonCB = useCallback(() => {
        setIsRedirectToCreateItemPage(true);
    }, [isRedirectToCreateItemPage]);

    const onClickLogOutButtunCB = useCallback(() => {
        setJWTTokenCB('');
        setIsRedirectToLoginPage(true);
    }, [isRedirectToLoginPage]);

    useEffect(() => {
        APIGetContent.getUser(JWTToken)
            .then((response) => {

                if(response.email) {
                    setUserProfile(response);
                }
                else {
                    setIsRedirectToLoginPage(true);
                }   
                    
            });
    }, []);

    return (
        <>
            {isMobile ? (
                <></>
            )
            :
            (
                <div className={'profile-page__wrapper F-R-SP'}>
                    <main className={'profile-page__content F-R-SP'}>
                        <ProfileCard 
                            userProfile={userProfile} />
                        <section className={'profile-page__actions-buttons'}>
                            <button
                                onClick={onClickCreteItemButtonCB} >
                                {BUTTONS_TEXT.create_item}
                            </button>
                            <button>
                                {BUTTONS_TEXT.show_own_items}
                            </button>
                            <button>
                                {BUTTONS_TEXT.show_created_items}
                            </button>
                            <button
                                onClick={onClickLogOutButtunCB} >
                                {BUTTONS_TEXT.log_out}
                            </button>
                        </section>
                    </main>
                    {isRedirectToCreateItemPage &&
                        <Redirect to={'/create-item'} push={true} />
                    }
                    {isRedirectToLoginPage &&
                        <Redirect to={'/login'} push={true} />
                    }
                </div>
            )}  
        </>
    )
}

export const ProfilePage = memo(ProfilePageInner);
