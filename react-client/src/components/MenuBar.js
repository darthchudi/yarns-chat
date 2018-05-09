import React from 'react';
import {Link} from 'react-router-dom';

const menuBar =  (props) => {
	var onlineBarMessage = '';
	if(props.onlineUsers.length===0){
		onlineBarMessage = 'No other user is online'
	}

	if(props.onlineUsers.length===1){
		onlineBarMessage = '1 other user is online';
	}

	if(props.onlineUsers.length > 1){
		onlineBarMessage = `${props.onlineUsers.length} users are online`;
	}

	return (
		<nav className="navbar navbar-expand-md navbar-light bg-light">
			<Link to="/" className="navbar-brand"> <span role="img" aria-labelledby="icon"> 🗣️ yarns. </span>  </Link>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle Navigation">
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="collapse navbar-collapse" id="navbarCollapse">
				<ul className="navbar-nav mr-auto">
					<li className="nav-item active">
						<Link to="/" className="nav-link">Home</Link> 
					</li>

					<li className="nav-item">
						<Link to="/" className="nav-link">Profile</Link>
					</li>

					<li className="nav-item">
						<Link to="/" className="nav-link">About</Link>
					</li>

					<li className="nav-item dropdown">
						<a className="btn text-black btn-outline-info btn-sm dropdown-toggle ml-md-3 mt-md-1" data-toggle="dropdown" aria-haspopup="true" role="button" id="#onlineUsersDropdown" aria-expanded="false"> 	
							{onlineBarMessage}
						</a>
						<div className="dropdown-menu ml-md-3" aria-labelledby="onlineUsersDropdown">
							{props.onlineUsers.map((user, key)=>(
								<span href="" className="dropdown-item d-flex justify-content-between align-items-center" key={key}>
									{user}
									<span className="badge badge-success badge-pill">online</span>
								</span>
								
								
							))}
						</div>
					</li>
				</ul>

				<ul className="navbar-nav ml-auto">
					<li className="navbar-item">
						<form action="" className="form-inline">
							<button className="btn btn-outline-dark mr-4 my-2" type="button">Signed In As: {props.username}</button>
							<button className="btn btn-outline-danger my-2 m" type="button" onClick={props.logout}>Logout</button>
						</form>
					</li>
				</ul>
			</div>	
		</nav>
	)
}

export default menuBar;