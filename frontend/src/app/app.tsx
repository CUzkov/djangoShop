import * as React from "react";
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';
import { MainPage } from 'pages/main-page'
import { ItemsPage } from 'pages/items-page'

import './app.scss';


export const App = (): React.ReactElement => {

	fetch('http://127.0.0.1:8000/api/item/')
		.then(response => response.json())
		.then(response => {
			console.log(response)
		});

	return (
		<>
			<Router>
				<Route path="/" exact render={MainPage} />
				<Route path="/items" render={ItemsPage} />

			</Router>
		</>
	)
}
