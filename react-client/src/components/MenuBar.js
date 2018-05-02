import React from 'react';
const menuBar =  (props) => (
	<div className="ui secondary menu">
		<a href="/user/home" className="active item">
			Home
		</a>
		<a href="/user/update-profile" className="item">
			Profile
		</a>
		<div className="right menu">
			<a className="ui item"><i className="user circle icon"></i> Logged In as: <span className="username"> {props.username} </span> </a>
			<a className="ui item" href="logout" onClick={props.logout}> <i className="power off icon"></i>Logout</a>
		</div>
	</div>
)

export default menuBar;