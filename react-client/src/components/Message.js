import React, {Component} from 'react';


class Message extends Component{
	render(){
		var messageClass = this.props.message.source==='internal' ? 'bg-white' : 'text-white bg-dark';
		return (
			<div className="row">
				<div className="col">
					<div className={`card w-75 mx-md-auto my-3 ${messageClass}`}>
						<div className="card-body">
							<h5 className="card-title">{this.props.message.sender}</h5>
							<p className="card-text pl-3">
								{this.props.message.content} 
							</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Message;