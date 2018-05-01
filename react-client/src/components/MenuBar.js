import React, {Component} from 'react';

class MenuBar extends Component{
	render(){
		return(
			<div className="ui secondary menu">
				<a href="/user/home" className="active item">
					Home
				</a>
				<a href="/user/update-profile" className="item">
					Profile
				</a>
				<div className="right menu">
					<a className="ui item"> <i className="user circle icon"></i> </a>
					<a className="ui item" href="logout"> <i className="power off icon"></i>Logout</a>
				</div>
			</div>
		)
	}
}

export default MenuBar;