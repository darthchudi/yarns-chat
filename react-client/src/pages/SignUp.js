import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import '../styles/semantic-ui/semantic.min.css';
import '../styles/sign-up.css';
import axios from 'axios';
import Auth from '../helpers/auth';
const auth = new Auth();

class SignUp extends Component{
	constructor(props){
		super(props);
		this.submit = this.submit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			loading: false,
			firstname: '',
			lastname: '',
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
		
	}

	submit(e){
		e.preventDefault();
		var data = {
			firstname: this.state.firstname,
			lastname: this.state.lastname,
			username: this.state.username,
			password: this.state.password
		};
		
		this.setState({loading: true});

		axios.post('/user/signup', data)
			.then((data)=>{
				var response = data.data;
				var newUser = response.user;
				auth.authenticateUser(response.token);
				this.successMessage = `Successfully created a new account for ${newUser.username}`;
				this.setState({loading: false});
			})
			.catch((e)=>{
				console.log(e);
			});
	}



	render(){
		if(auth.isUserAuthenticated()){
			return <Redirect to="/" />
		}

		return (
			<div>
				<h4 className="ui horizontal divider">
					<i className="user plus icon"></i>
					User Signup
				</h4>
				<form className={`ui form signup ${this.state.loading ? 'loading' : ''}`} method="POST" action="/user/signup" onSubmit={this.submit}>
					<div className="field">
						<label>Name</label>
						<div className="two fields">
							<div className="field">
								<input type="text" name="firstname" placeholder="First Name" onChange={this.handleChange}/>
							</div>
							<div className="field">
								<input type="text" name="lastname" placeholder="Last Name" onChange={this.handleChange}/>
							</div>
						</div>
					</div>

					<div className="field">
						<label>Username</label>
						<input type="text" name="username" placeholder="Username" onChange={this.handleChange}/>
					</div>


					<div className="field">
						<label>password</label>
						<input type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
					</div>
					<input type="submit" name="submit" value="Sign Up!" className="ui button big teal" onClick={this.submit}/>
					<p>Already have an account? <Link to="/login">Login </Link> </p>
				</form>
			</div>
		)
	}
}

export default SignUp;