import React, {Component} from 'react';

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
			<div className="col pt-3">
				<div className="container">
					<form onSubmit={this.sendMessage}>
						<div className="form-row mb-2">
							<div className="col-sm-8 col-md-10 mb-2">
								<input type="text" className="form-control" placeholder="New Message..." name="message" onChange={this.handleChange} value={this.state.message} autoComplete="off"/>
							</div>

							<div className="col-sm-2 col-md-2">
								<input type="submit" className="btn btn-purple round" value="send message 🚀" onClick={this.sendMessage}/>
							</div>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default MessageText;