class Auth {
	authenticateUser(token){
		localStorage.setItem('token', token);
	}

	getToken(){
		return localStorage.getItem('token');
	}

	isUserAuthenticated(){
		var tokenExists = this.getToken() !== null;
		return tokenExists;
	}

	deauthenticateUser(){
		localStorage.removeItem('token');
	}
}

module.exports = Auth;