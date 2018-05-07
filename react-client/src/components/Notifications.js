import React from 'react';

const notifications = (props)=>(
	<div className="container">
		{props.notifications.map((notification, key)=>(
			<div className="row" key={key}>
				<div className="col">
					<div className="alert alert-info w-75 mx-auto">
						{notification}
					</div>
				</div>
			</div>
		))}
	</div>
)

export default notifications;