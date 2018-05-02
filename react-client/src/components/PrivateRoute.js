import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Auth from '../helpers/auth';
var auth = new Auth();

const PrivateRoute = ({component: Component, ...rest})=> (
	<Route {...rest} render={ (props)=>(
			auth.isUserAuthenticated() === true ? <Component {...props} /> : <Redirect to="/login" />
		)}
	/>

)

export default PrivateRoute