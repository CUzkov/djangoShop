import * as React from "react";
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';
import { MainPage } from 'pages/main-page'
import { ItemsPage } from 'pages/items-page'
import { LogInPage } from 'pages/log-in-page'
import { Header } from 'components/header'
import { ProfilePage } from 'pages/profile-page'
import { CreateItemPage } from 'pages/create-item-page' 

import './app.scss';


export const App = (): React.ReactElement => {

	return (
		<>
			<Router>
				<Header />
				<Route path={'/'} exact render={() => ( <MainPage /> )} />
				<Route path={'/items'} render={() => ( <ItemsPage /> )} />
				<Route path={'/login'} render={() => ( <LogInPage /> )} />
				<Route path={'/profile'} render={() => ( <ProfilePage /> ) } />
				<Route path={'/create-item'} render={() => ( <CreateItemPage /> ) } />
			</Router>
		</>
	)
}
