import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import Auth from '../helpers/auth';
const auth = new Auth();

class Login extends Component{
	constructor(props){
		super(props);
		this.submit = this.submit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.isFormComplete = this.isFormComplete.bind(this);
		this.state = {
			loading: false,
			username: '',
			password: '',
			token: '',
			invalid: false,
			successMessage: ''
		}
	}

	handleChange(e){
		this.setState({[e.target.name]: e.target.value});
	}

	isFormComplete(){
		if(this.state.username ==='' || this.state.password === ''){
			return true;
		}
		return false;
	}

	submit(e){
		e.preventDefault(); 
		var data = {
			username: this.state.username,
			password: this.state.password
		}
		this.setState({loading: true});
		// axios.defaults.headers.common['x-access-token'] = token;

		axios.post('/api/login', data)
			.then((data)=>{
				var response = data.data;
				auth.authenticateUser(response.token)
				// console.log(`Successfully logged ${response.user.username}`);
				this.setState({loading: false});
			})
			.catch((e)=>{
				var error = e.response;

				if(error.status===401){
					this.setState({invalid: true});
				}
				// console.log(error);
			});

	}

	render(){
		if(auth.isUserAuthenticated()){
			return <Redirect to="/" />
		}

		return (
			<div>
				<h1 className="yarn-icon display3"> <span role="img" aria-label="icon">🗣️</span> yarns.</h1>
				<div className="container">
					<div className="row">
						<div className="col">
							<div className="d-flex justify-content-center form-box p-3 mt-2">
								<form onSubmit={this.submit}>
									<h1 className="mx-auto display2">Login</h1>

									<div className="form-row">
										<div className="col form-group">
											<label htmlFor="username">Username</label>
											<div className="input-group">
												<div className="input-group-prepend">
													<span className="input-group-text" id="inputGroupPrepend">@</span>
												</div>
												<input type="text" className={`form-control ${this.state.invalid ? 'is-invalid' : ''} `} placeholder="Username" id="username" aria-describedby="inputGroupPrepend" name="username" onChange={this.handleChange}/>
												{
													this.state.invalid ? (
														<div className="invalid-feedback">
															Invalid username or password	
														</div>
													) : ''
												}

											</div>
										</div>	
									</div>

									<div className="form-row">
										<div className="col form-group">
											<label htmlFor="username">Password</label>
											<input type="password" className={`form-control ${this.state.invalid ? 'is-invalid' : ''} `} placeholder="Password" name="password" onChange={this.handleChange}/>
											{
												this.state.invalid ? (
													<div className="invalid-feedback">
														Invalid username or password	
													</div>
												) : ''
											}
										</div>	
									</div>

									<div className="form-row">
										<div className="col">
											<input type="submit" className="btn btn-purple w-100" value="Login!" onClick={this.submit} disabled={this.isFormComplete()}/>
										</div>
									</div>
									<small className="form-text prompt pt-2">
										Don't have a yarns account? <span className="yarns"><Link to="/signup">Sign Up </Link></span>
									</small>
								</form>
							</div>
						</div>
					</div>

				</div>

				<div className="row">
					<div className="col">
						<div className="with-love pt-3 fixed-bottom">
							<p className="align-middle">
								Made with  <span role="img" aria-label="icon">💛 and ☕ by </span> <a href="https://github.com/darthchudi" className="github"> Chudi. </a>
							</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Login;