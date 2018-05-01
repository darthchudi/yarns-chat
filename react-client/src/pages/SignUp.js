import React, {Component} from 'react';
import '../styles/semantic-ui/semantic.min.css';
import '../styles/sign-up.css';
import axios from 'axios';

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
			password: ''
		}
	}

	handleChange(e){
		this.setState({[e.target.name]: e.target.value});
	}

	componentDidMount(){
		console.log(localStorage.getItem('rice'));
	}

	submit(e){
		e.preventDefault();
		var data = this.state;
		this.setState({loading: true});
		localStorage.setItem('rice', 'heh');
		console.log(data);
		// axios.post('/api/user/signup', data)
		// 	.then((data)=>{
		// 		console.log('data');
		// 	})
		// 	.catch((e)=>{
		// 		console.log(e);
		// 	});

	}



	render(){
		return (
			<div>
				<h4 className="ui horizontal divider">
					<i className="user plus icon"></i>
					User Login
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
				</form>
			</div>
		)
	}
}

export default SignUp;