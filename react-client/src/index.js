import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import App from './App';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import registerServiceWorker from './registerServiceWorker';

import './styles/bootstrap/dist/css/bootstrap.min.css';
import './styles/yarns.css';

ReactDOM.render((
	<HashRouter>
		<div>
			<PrivateRoute exact path="/" component={App}/>
			<Route path="/signup" component={SignUp}/>		
			<Route path="/login" component={Login}/>	
		</div>
	</HashRouter>
	), document.getElementById('root'));
registerServiceWorker();
