import React, {Component} from 'react';
import '../styles/semantic-ui/semantic.min.css';
import '../styles/sign-up.css';
import axios from 'axios';
import Auth from '../helpers/auth';

class Login extends Component{
	constructor(props){
		super(props);
		this.submit = this.submit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			loading: false,
			username: '',
			password: '',
			token: '',
			successMessage: ''
		}
	}

	handleChange(e){
		this.setState({[e.target.name]: e.target.value});
	}

	componentDidMount(){
		// console.log(localStorage.getItem('rice'));
	}

	submit(e){
		e.preventDefault();
		var data = {
			username: this.state.username,
			password: this.state.password
		}
		this.setState({loading: true});
		const auth = new Auth();
		// axios.defaults.headers.common['x-access-token'] = token;

		axios.post('/user/login', data)
			.then((data)=>{
				this.setState({loading: false});
				var response = data.data;
				auth.authenticateUser(response.token)
				console.log(`Successfully logged ${response.user.username}`);
			})
			.catch((e)=>{
				console.log(e);
			});

	}

	render(){
		return (
			<div>
				<h4 className="ui horizontal divider">
					<i className="user plus icon"></i>
					User Login
				</h4>
				<form className={`ui form signup ${this.state.loading ? 'loading' : ''}`} method="POST" action="/user/login" onSubmit={this.submit}>
					<div className="field">
						<label>Username</label>
						<input type="text" name="username" placeholder="Username" onChange={this.handleChange}/>
					</div>


					<div className="field">
						<label>password</label>
						<input type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
					</div>
					<input type="submit" name="submit" value="Sign Up!" className="ui button big teal" onClick={this.submit}/>
				</form>
			</div>
		)
	}
}

export default Login;