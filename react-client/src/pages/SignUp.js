import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import Auth from '../helpers/auth';
const auth = new Auth();

class SignUp extends Component{
	constructor(props){
		super(props);
		this.submit = this.submit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.isFormComplete = this.isFormComplete.bind(this);
		this.state = {
			loading: false,
			firstname: '',
			lastname: '',
			username: '',
			password: '',
			token: '',
			usernameTaken: false,
			successMessage: ''
		}
	}

	handleChange(e){
		this.setState({[e.target.name]: e.target.value});

		if(this.state.usernameTaken && e.target.name==='username'){
			this.setState({usernameTaken: false});
		}
	}

	isFormComplete(){
		if(this.state.firstname === '' || this.state.lastname === '' || this.state.username ==='' || this.state.password === ''){
			return true;
		}
		return false;
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

		axios.post('/api/signup', data)
			.then((data)=>{
				var response = data.data;
				var newUser = response.user;
				auth.authenticateUser(response.token);
				this.successMessage = `Successfully created a new account for ${newUser.username}`;
				this.setState({loading: false});
			})
			.catch((e)=>{
				var error = e.response;
				if(error.status===401){
					this.setState({usernameTaken: true});
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
							<div className="d-flex justify-content-center form-box p-3 mt-md-2">
								<form method="POST" onSubmit={this.submit}>
									<h1 className="mx-auto display2">Sign Up</h1>

									<div className="form-row pt-3" id="names">
										<div className="col col-sm-6 form-group">
											<label htmlFor="firstname">First Name</label>
											<input type="text" className="form-control" placeholder="First Name" id="firstname" name="firstname" onChange={this.handleChange}/> 
										</div>

										<div className="col col-sm-6 form-group">
											<label htmlFor="lastname">Last Name</label>
											<input type="text" className="form-control" placeholder="Last Name" id="lastname" name="lastname" onChange={this.handleChange}/>
										</div>
									</div>

									<div className="form-row">
										<div className="col form-group">
											<label htmlFor="username">Username</label>
											<div className="input-group">
												<div className="input-group-prepend">
													<span className="input-group-text" id="inputGroupPrepend">@</span>
												</div>
												<input type="text" className={`form-control ${this.state.usernameTaken ? 'is-invalid' : ''}`} placeholder="Username" id="username" aria-describedby="inputGroupPrepend" name="username" onChange={this.handleChange}/>
												{
													this.state.usernameTaken ? (
														<div className="invalid-feedback">
															Sorry, that username is taken.	
														</div>
													) : ''
												}
											</div>
										</div>	
									</div>

									<div className="form-row">
										<div className="col form-group">
											<div className="form-group">
												<label htmlFor="username">Password</label>
												<input type="password" className="form-control" placeholder="Password" name="password" onChange={this.handleChange} />
											</div>
										</div>	
									</div>

									<div className="form-row">
										<div className="col">
											<input type="submit" className="btn btn-purple w-100" value="Sign Up!" onClick={this.submit} disabled={this.isFormComplete()}/>
										</div>
									</div>
									<small className="form-text prompt pt-2">
										Already have a Yarns account? <span className="yarns"><Link to="/login">Login</Link></span>
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

export default SignUp;