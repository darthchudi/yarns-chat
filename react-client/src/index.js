import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route} from 'react-router-dom';
import App from './App';
import SignUp from './pages/SignUp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
	<HashRouter>
		<div>
			<Route exact path="/" component={App}/>
			<Route path="/signup" component={SignUp}/>			
		</div>
	</HashRouter>
	), document.getElementById('root'));
registerServiceWorker();
