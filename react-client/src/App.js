import React, { Component } from 'react';
import axios from 'axios';
import SocketIOClient from 'socket.io-client';
import './styles/semantic-ui/semantic.min.css';
import {getFunName} from './helpers';
import MessageText from './components/MessageText';
import MenuBar from './components/MenuBar';
import MessagesContainer from './components/MessagesContainer';
class App extends Component {
	constructor(props){
		super(props);
		this.updateMessages = this.updateMessages.bind(this);
		this.recieveMessage = this.recieveMessage.bind(this);
		var client = SocketIOClient('http://localhost:3001');
		this.state = {
			messages: [],
			client: client,
			sender: getFunName()
		}

		this.state.client.on('new message', this.recieveMessage);
	}

	componentWillMount(){
		axios.get('/api/test')
			.then((data)=>{

			})
	}

	updateMessages(message){
		this.state.client.emit('new message', {
				content: message.content,
				sender: message.sender,
				source: 'external'
		});

		var messages = this.state.messages;
		messages.push(message);
		this.setState({messages});
	}

	recieveMessage(message){
		console.log(message)
		var messages = this.state.messages;
		messages.push(message);
		this.setState({messages});
	}	

	render() {
		return (
			<div>
				<MenuBar/>
				<MessagesContainer messages={this.state.messages}/>
				<MessageText updateMessages={this.updateMessages} sender={this.state.sender}/>
			</div>
		)
	}
}

export default App;
