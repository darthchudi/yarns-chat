import React from 'react';

const onlineUsers = ({onlineUsers})=>(
	<div className="ui secondary vertical pointing menu">
	  	<a className="item">
			<h4 className="ui header">{onlineUsers.length} {onlineUsers.length === 1 ? 'other user is online' : 'other users are online'} </h4>
	  	</a>
	  	{ onlineUsers.map((user, key)=> (
	  		<a className="item" key={key}>
			    {user} 
			    <div className="ui green horizontal label">online.</div>
		  	</a>
		))}
	</div>
)

export default onlineUsers;