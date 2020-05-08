import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as Link } from 'react-router-dom';
import classNames from 'classnames';

import { 
    Nav,
    DropdownToggle,
    NavLink,
    UncontrolledDropdown,
    NavItem,
    DropdownMenu,
    DropdownItem,
    NestedDropdown
} from './../../../components';

const NavbarNavigation = ({ accent, pills, ...navbarProps }) => (
    <Nav navbar accent={ accent } pills={ pills } { ...navbarProps }>
        <NavItem>
            <NavLink tag={ Link } to="/interface/navbars">
                <span className={ classNames({ 'mr-3': !(pills || accent) }) }>
                    <i className="fa fa-fw fa-home d-none d-md-inline"></i>
                    <span className="d-md-none">
                        Home
                    </span>
                </span>
            </NavLink>
        </NavItem>
        <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav>
                Início
                <i className="fa fa-angle-down fa-fw ml-1"></i>
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem tag={ Link } to="/home/graphics">Analytics</DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    </Nav>
);
NavbarNavigation.propTypes = {
    pills: PropTypes.bool,
    accent: PropTypes.bool,
};


export { NavbarNavigation };
