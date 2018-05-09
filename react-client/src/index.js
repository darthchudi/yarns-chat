import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import App from './App';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import registerServiceWorker from './registerServiceWorker';

import './includes/bootstrap';
import './styles/yarns.css';

ReactDOM.render((
	<BrowserRouter>
		<div>
			<Switch>
				<PrivateRoute exact path="/" component={App}/>
				<Route exact path="/signup" component={SignUp}/>		
				<Route exact path="/login" component={Login}/>	
				<Route component={NoMatch}/>
			</Switch>
		</div>
	</BrowserRouter>
	), document.getElementById('root'));
registerServiceWorker();
