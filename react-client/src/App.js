import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import SocketIOClient from 'socket.io-client';
import './styles/semantic-ui/semantic.min.css';
import {getFunName} from './helpers/name-generator';
import MessageText from './components/MessageText';
import MenuBar from './components/MenuBar';
import Notifications from './components/Notifications';
import MessagesContainer from './components/MessagesContainer';
import Auth from './helpers/auth';
const auth = new Auth();

class App extends Component {
	constructor(props){
		super(props);
		this.updateMessages = this.updateMessages.bind(this);
		this.recieveMessage = this.recieveMessage.bind(this);
		this.userJoined = this.userJoined.bind(this);
		this.userLeft = this.userLeft.bind(this);
		this.logout = this.logout.bind(this);
		this.state = {
			messages: [],
			client: '',
			sender: getFunName(),
			isAuthenticated: true,
			user: {},
			loaded: false,
			notifications: []
		}
	}

	componentDidMount(){
		axios.defaults.headers.common['x-access-token'] = auth.getToken();
		axios.get('/user/get')
			.then((data)=>{
				var response = data.data;
				this.setState({user: response.user});
				var client = SocketIOClient(`http://localhost:3001?username=${this.state.user.username}`);
				this.setState({client: client});
				this.setState({loaded: true});
				this.state.client.on('new message', this.recieveMessage);
				this.state.client.on('user joined', this.userJoined);
				this.state.client.on('user left', this.userLeft);
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
		this.state.client.disconnect();
		this.setState({isAuthenticated: false});
	}

	userJoined(user){
		var notifications = this.state.notifications;
		notifications.push({
			event: 'join',
			message: `${user} just joined!`
		});
		this.setState({notifications});
		console.log(user +" just joined");
	}

	userLeft(user){
		var notifications = this.state.notifications;
		notifications.push({
			event: 'leave',
			message: `${user} just left!`
		});
		this.setState({notifications});
		console.log(user + " just left");
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
					{this.state.notifications ? <Notifications notifications={this.state.notifications} /> : ''}
					<MessageText updateMessages={this.updateMessages} user={this.state.user.username}/>
				</div>
			)
		}

	}
}

export default App;
