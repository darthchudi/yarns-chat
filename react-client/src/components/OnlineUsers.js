import React from 'react';

const onlineUsers = ({onlineUsers})=>(
	<div class="ui secondary vertical pointing menu">
	  	<a class="item">
			<h4 className="ui header">{onlineUsers.length} {onlineUsers.length == 1 ? 'user is online' : 'users are online'} </h4>
	  	</a>
	  	{ onlineUsers.map((user, key)=> (
	  		<a className="item">
			    {user} 
			    <div className="ui green horizontal label">online.</div>
		  	</a>
		))}
	</div>
)

export default onlineUsers;