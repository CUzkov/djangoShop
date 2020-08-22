import * as React from "react";
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';
import { MainPage } from 'pages/main-page'
import { ItemsPage } from 'pages/items-page'

import './app.scss';


export const App = (): React.ReactElement => {

	return (
		<>
			<Router>
				<Route path="/" exact render={MainPage} />
				<Route path="/items" render={ItemsPage} />

			</Router>
		</>
	)
}
