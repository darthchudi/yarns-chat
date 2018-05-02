import React from 'react';

const notifications = (props)=>(
	<ul>
		{props.notifications.map((notification, key)=>(
			<li key={key}>
				<div className="ui message compact info notification">
				  <div className="header">
				    {notification}
				  </div>
				</div>
			</li>
		))}

	</ul>


)

export default notifications;