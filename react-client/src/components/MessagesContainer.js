import React, {Component} from 'react';
import Message from './Message';

class MessagesContainer extends Component{
	render(){
		return(
			<div className="container-fluid ml-4 ml-md-5">
				{
					this.props.messages.map((message, key)=>
						<Message message={message} key={key} />
					)
				}
			</div>
		)
	}
}

export default MessagesContainer;