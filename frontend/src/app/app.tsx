import * as React from "react";
import {
	BrowserRouter as Router,
	Route,
} from 'react-router-dom';
import {
	useState,
	useCallback,
} from 'react'
import { Context } from '../contexts/app'
import { MainPage } from 'pages/main-page'
import { ItemsPage } from 'pages/items-page'
import { LogInPage } from 'pages/log-in-page'
import { Header } from 'components/header'
import { ProfilePage } from 'pages/profile-page'
import { CreateItemPage } from 'pages/create-item-page'
import { ItemPage } from 'pages/item-page'
import { BuyItemPage } from 'pages/buy-item-page'

import './app.scss';


export const App = (): React.ReactElement => {

	const [JWTToken, setJWTToken] = useState<string>('');
	const [UID, setUID] = useState<number>(-1);

	const setJWTTokenCB = useCallback((value: string): void => {
		setJWTToken(value);
	}, [JWTToken]);

	const setUIDCB = useCallback((value: number):void => {
		setUID(value);
	}, [UID]);


	return (
		<>
			<Router>
				<Context.Provider
					value={{
						setJWTTokenCB,
						JWTToken,
						setUIDCB,
						UID,
					}} >
					<Header />
					<Route path={'/'} exact render={() => ( <MainPage /> )} />
					<Route path={'/items'} exact render={() => ( <ItemsPage /> )} />
					<Route path={'/login'} render={() => ( <LogInPage /> )} />
					<Route path={'/profile'} render={() => ( <ProfilePage /> ) } />
					<Route path={'/create-item'} render={() => ( <CreateItemPage /> ) } />
					<Route path={'/items/:id'} exact render={(props) => ( <ItemPage {...props} /> ) } />
					<Route path={'/items/:id/buy'} exact render={(props) => ( <BuyItemPage {...props} /> ) } />
				</Context.Provider>
			</Router>
		</>
	)
}
