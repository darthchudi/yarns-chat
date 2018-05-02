import React, {Component} from 'react';
import Message from './Message';
import '../styles/messages-container.css';

class MessagesContainer extends Component{
	render(){
		var counter = 0;
		return(
				<ul>
					{
						this.props.messages.map((message)=>
							<Message message={message} key={counter+=1} />
						)
					}
				</ul>

		)
	}
}

export default MessagesContainer;