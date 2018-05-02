import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import SocketIOClient from 'socket.io-client';
import './styles/semantic-ui/semantic.min.css';
import {getFunName} from './helpers/name-generator';
import MessageText from './components/MessageText';
import MenuBar from './components/MenuBar';
import MessagesContainer from './components/MessagesContainer';
import Auth from './helpers/auth';
const auth = new Auth();

class App extends Component {
	constructor(props){
		super(props);
		this.updateMessages = this.updateMessages.bind(this);
		this.recieveMessage = this.recieveMessage.bind(this);
		this.logout = this.logout.bind(this);
		var client = SocketIOClient('http://localhost:3001');
		this.state = {
			messages: [],
			client: client,
			sender: getFunName(),
			isAuthenticated: true,
			user: {},
			loaded: false
		}

		this.state.client.on('new message', this.recieveMessage);
	}

	componentDidMount(){
		axios.defaults.headers.common['x-access-token'] = auth.getToken();
		axios.get('/user/get')
			.then((data)=>{
				var response = data.data;
				this.setState({user: response.user});
				this.setState({loaded: true});
			})
			.catch((e)=>{
				console.log(e);
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
		message.source = this.state.user.username === message.sender ? 'internal' : 'external';
		var messages = this.state.messages;
		messages.push(message);
		this.setState({messages});
	}

	logout(e){
		e.preventDefault();
		auth.deauthenticateUser();
		this.setState({isAuthenticated: false});
	}

	render() {
		if(!auth.isUserAuthenticated()){
			return <Redirect to="/login" />
		}

		if(!this.state.loaded){
			return (<p> Loading... </p>)
		}

		if(this.state.loaded){
			return (
				<div>
					<MenuBar logout={this.logout} username={this.state.user.username}/>
					<MessagesContainer messages={this.state.messages}/>
					<MessageText updateMessages={this.updateMessages} user={this.state.user.username}/>
				</div>
			)
		}

	}
}

export default App;
