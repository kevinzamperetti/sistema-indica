import React, { Component } from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Nav, NavItem, NavLink } from '../../../components';

export class ProfileLeftNav extends Component {
    constructor( props ) {
        super( props )
    }

    render() {
        if ( localStorage.getItem('Profile') == "ADMINISTRATOR" ) {
            return (
                <React.Fragment>
                    <div className="mb-4">
                        <Nav pills vertical>
                            <NavItem>
                                <NavLink tag={ RouterNavLink } to="/administrator/profile-details">
                                    Minha Conta
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                </React.Fragment>
            )
        } else if ( localStorage.getItem('Profile') == "EXTERNAL" ) {
            return (
                <React.Fragment>
                    <div className="mb-4">
                        <Nav pills vertical>
                            <NavItem>
                                <NavLink tag={ RouterNavLink } to="/external/profile-details">
                                    Minha Conta
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={ RouterNavLink } to="/external/account-edit">
                                    Dados bancários
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                </React.Fragment>
            )
        } else if ( localStorage.getItem('Profile') == "COLLABORATOR" ) {
            return (
                <React.Fragment>
                    <div className="mb-4">
                        <Nav pills vertical>
                            <NavItem>
                                <NavLink tag={ RouterNavLink } to="/collaborator/profile-details">
                                    Minha Conta
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={ RouterNavLink } to="/collaborator/account-edit">
                                    Dados bancários
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                </React.Fragment>                
            )
        } else {
            return(
                <React.Fragment>
                    <div className="mb-4">
                        <Nav pills vertical>
                            <NavItem>
                                {/* <NavLink tag={ RouterNavLink } to="/pages/error-404">
                                    Minha Conta
                                </NavLink> */}
                            </NavItem>
                        </Nav>
                    </div>
                </React.Fragment>
            )
        }
    }
}