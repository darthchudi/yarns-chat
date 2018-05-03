import React, {Component} from 'react';


class Message extends Component{
	render(){
		var messageClass = this.props.message.source==='internal' ? 'black internal' : 'external';
		return (
			<li className="message-list-item">
				<div className={`ui floating message compact ${messageClass}`}>
					<div className="header">
						{this.props.message.sender}
					</div>
					{this.props.message.content} 
				</div>

			</li>

		)
	}
}

export default Message;