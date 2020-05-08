import React from 'react';
import { Link } from 'react-router-dom';

export default class Util extends React.Component {

	logout() {
		localStorage.removeItem('Authorization')
		localStorage.removeItem('Email')
		localStorage.removeItem('Name')
		localStorage.removeItem('Profile')
		localStorage.removeItem('SectorCompany')
	} 

	render() {
		return (
			<React.Fragment>
				{ this.logout.bind( this ) }
				<Link to="/pages/login" className="ml-auto text-decoration-none"/>
			</React.Fragment>
		)
	}
}

