import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import SocketIOClient from 'socket.io-client';	
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
		this.handleNotification = this.handleNotification.bind(this);
		this.logout = this.logout.bind(this);
		this.state = {
			messages: [],
			client: '',
			sender: getFunName(),
			isAuthenticated: true,
			user: {},
			loaded: false,
			notifications: [],
			onlineUsers: []
		}
	}

	componentDidMount(){
		axios.defaults.headers.common['x-access-token'] = auth.getToken();
		axios.get('/api/get/user')
			.then((data)=>{
				var response = data.data;
				this.setState({user: response.user});
				// var client = SocketIOClient(`http://localhost:3001?username=${this.state.user.username}`);
				var client = SocketIOClient(`https://yarns-chat.herokuapp.com/?username=${this.state.user.username}`);
				this.setState({client: client});
				this.setState({loaded: true});
				this.state.client.on('new message', this.recieveMessage);
				this.state.client.on('user joined', this.handleNotification);
				this.state.client.on('user left', this.handleNotification);

				this.state.client.on('get online users', (users)=>{
					var onlineUsers = users;
					var index = onlineUsers.indexOf(this.state.user.username);
					onlineUsers.splice(index, 1);
					this.setState({onlineUsers});
				});
			})
			.catch((e)=>{
				// console.log(e);
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
	
	handleNotification(notification){
		var onlineUsers = notification.onlineUsers;
		var index = onlineUsers.indexOf(this.state.user.username);
		onlineUsers.splice(index, 1);
		this.setState({onlineUsers});

		var notifications = this.state.notifications;
		if(notification.event==='join'){
			notifications.push(`${notification.user} just joined!`);
		}

		if(notification.event==='leave'){
			notifications.push(`${notification.user} just left!`);
		}

		this.setState({notifications});
		setTimeout(()=>{
			notifications.shift();
			this.setState({notifications});
		}, 1000);
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
				<div id="messagesContainer">
					<MenuBar logout={this.logout} username={this.state.user.username} onlineUsers={this.state.onlineUsers}/>

					<main className="mt-3">

						<div className="row">
							<div className="col-sm-8 col-md-10" id="messages">
								<MessagesContainer messages={this.state.messages}/>
							</div>

							<div className="col-sm-4 col-md-2" id="notifications">
								{this.state.notifications ? <Notifications notifications={this.state.notifications} /> : ''}
							</div>
						</div>

						<div className="row fixed-bottom message-input-box">
							<MessageText updateMessages={this.updateMessages} user={this.state.user.username}/>
						</div>

					</main>
				</div>
			)
		}

	}
}

export default App;
