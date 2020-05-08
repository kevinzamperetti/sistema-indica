import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { NavItem, NavLink } from './../../components';
import Util from '../../components/Util/Util';

//const NavbarUser = (props) => (
export class NavbarUser extends React.Component {
    constructor( props ) {
        super( props )
        this.util = new Util();
    }

    render() {
        return (
            <NavItem { ...this.props }>
            <NavLink tag={ Link } onClick={ this.util.logout.bind( this ) } to="/pages/login">
                <i className="fa fa-power-off"></i>
            </NavLink>
        </NavItem>
        )
    }
}

NavbarUser.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
};

// export { NavbarUser };
