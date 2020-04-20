export default class Util {
	constructor() {
		this.teste = ''
	}

	logout() {
		localStorage.removeItem('Authorization')
		this.props.history.push("/pages/login")
	} 
}

