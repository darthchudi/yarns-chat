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
			sender: this.props.sender,
			content: this.state.message,
			source: 'internal'
		}
		this.props.updateMessages(message);
		this.setState({message: ''})
	}

	render(){
		return( 
			<form className="ui form container" onSubmit={this.sendMessage}>
				<div className="fields">
					<div className="twelve field wide">
						<div className="ui action input">
							<input type="text" name="message" placeholder="New message..." onChange={this.handleChange} value={this.state.message}/>
							<a onClick={this.sendMessage}>
								<div className="ui submit button violet inverted">
									<i className="paper plane icon"></i>
								</div>
							</a>
						</div>
					</div>
				</div>
			</form>
		)
	}
}

export default MessageText;