import * as React from "react";
import { 
    ReactElement,
    useState,
    useCallback,
    useReducer,
    useRef,
    useEffect
} from 'react';
import { isMobile } from 'react-device-detect';
import { reducer, initialState } from './reducer'
import { APIGetContent } from '../../api/api'
import { Redirect } from 'react-router-dom';

import './log-in-page.scss';


export const LogInPage = (): ReactElement => {
    
    const [isRegBlockShow, setIsRegBlockShow] = useState<boolean>(true);
    const [userFields, dispatchUserFields] = useReducer(reducer, initialState);
    const emailInput = useRef(null);
    const [isRegButtonDisable, setIsRegButtonDisable] = useState<boolean>(true);
    const [isLoginButtonDisablr, setIsLoginButtonDisable] = useState<boolean>(true);
    const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

    const onClickOrRegButtonCB = useCallback((event: React.SyntheticEvent):void => {
        event.preventDefault();
        setIsRegBlockShow(!isRegBlockShow);
    }, [isRegBlockShow]);

    const onChangeRegInputCB = useCallback(

        (inputType: string) =>

            (event: React.ChangeEvent<HTMLInputElement>) => {
        
                dispatchUserFields({
                    type: inputType,
                    [inputType]: event.target.value,
        });

    }, [userFields]);

    const onClickRegButtonCB = useCallback((event: React.SyntheticEvent):void => {

        event.preventDefault();

        if(userFields.password === userFields.repeat_password) {

            const resp = APIGetContent.createNewUser(userFields);

        }
        else {

        }

    }, [userFields]);

    const onCLickLoginButtonCB = useCallback((event: React.SyntheticEvent):void => {

        event.preventDefault();

        APIGetContent.getToken(userFields)
            .then((response) => {

                if(response.refresh) {

                    localStorage.setItem("refresh_token", response.refresh);

                    setIsRedirecting(true);
                }
                else {
                    alert("Invalid login or password")
                }

            });

    }, [userFields]);

    useEffect(() => {

        if(isRegBlockShow) {
            if(
                userFields.username &&
                emailInput.current.validity.valid
            ) { setIsRegButtonDisable(false); } 
            else { setIsRegButtonDisable(true); }
        }
        else {
            if(
                userFields.username && 
                userFields.password
            ) { setIsLoginButtonDisable(false); }
            else { setIsLoginButtonDisable(true); }
        }

    });

    return (
        <>
            {isMobile ? (
                <></>
            )
            :
            (
                <main className={'log-in-page__wrapper F-R-C'}>
                    {isRegBlockShow ? (
                        <div className={'log-in-page__reg-block F-R-C'}>
                            <div style={{width: "min-content"}}>
                                <div className={'reg-block__input F-R-C'}>
                                    <input 
                                        type={'text'}
                                        placeholder={'Логин'}
                                        required
                                        onChange={onChangeRegInputCB('login')} />
                                </div>
                                <div className={'reg-block__input F-R-C'}>
                                    <input 
                                        type={'email'} 
                                        placeholder={'Email'}
                                        required
                                        onChange={onChangeRegInputCB('email')}
                                        ref={emailInput} />
                                </div>
                                <div className={'reg-block__input F-R-C'}>
                                    <input 
                                        type={'password'} 
                                        placeholder={'Пароль'}
                                        required
                                        onChange={onChangeRegInputCB('password')} />
                                </div>
                                <div className={'reg-block__input F-R-C'}>
                                    <input 
                                        type={'password'} 
                                        placeholder={'Повторите пароль'}
                                        required
                                        onChange={onChangeRegInputCB('repeat_password')} />
                                </div>
                                <button
                                    onClick={onClickRegButtonCB}
                                    disabled={isRegButtonDisable} >
                                    Зарегистрироваться
                                </button>
                                <button 
                                    onClick={onClickOrRegButtonCB} >
                                    Или войти
                                </button>
                            </div>
                        </div>
                    )
                    :
                    (
                        <div className={'log-in-page__login-block F-R-C'}>
                            <div style={{width: "min-content"}}>
                                <input 
                                    type={'text'}
                                    placeholder={'Логин'}
                                    required
                                    onChange={onChangeRegInputCB('login')} />
                                <input 
                                    type={'password'} 
                                    placeholder={'Пароль'}
                                    required
                                    onChange={onChangeRegInputCB('password')} />
                                <button
                                    disabled={isLoginButtonDisablr}
                                    onClick={onCLickLoginButtonCB} >
                                    Войти
                                </button>
                                <button 
                                    onClick={onClickOrRegButtonCB} >
                                    Или зарегистрироваться
                                </button>
                            </div>
                        </div>
                    )}
                    {isRedirecting &&
                        <Redirect to={'/'} push={true} />
                    }
                </main>
            )}  
        </>
    );
}
