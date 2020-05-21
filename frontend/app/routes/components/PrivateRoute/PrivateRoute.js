import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ( { component: Component, ...rest } ) => (
	<Route { ...rest } render={ props => (
		localStorage.getItem('Authorization')
			? <Component { ...props } />
			: <Redirect to="/pages/login" />
	) } />
)