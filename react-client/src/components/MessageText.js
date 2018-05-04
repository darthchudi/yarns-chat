import React, {Component} from 'react';
import '../styles/message-text.css';

class MessageText extends Component{
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
		this.state = {
			message: ''
		}
	}

	handleChange(e){
		this.setState({message: e.target.value});
	}

	sendMessage(e){
		e.preventDefault();
		var message = {
			sender: this.props.user,
			content: this.state.message,
			source: 'internal'
		}
		this.props.updateMessages(message);
		this.setState({message: ''})
	}

	render(){
		return( 
			<div>
				<form className="ui form container" onSubmit={this.sendMessage}>
					<div className="ui fluid action input">
						<input type="text" name="message" placeholder="New message..." onChange={this.handleChange} value={this.state.message}/>
						<button className="ui icon button" onClick={this.sendMessage}>
							<i className="paper plane icon"></i>
						</button>
					</div>			
				</form>
			</div>
		)
	}
}

export default MessageText;