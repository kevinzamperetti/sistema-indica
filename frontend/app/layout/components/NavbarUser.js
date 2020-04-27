import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// import Util from '../../../app/components/Util';

import {
    NavItem,
    NavLink
} from './../../components';

const NavbarUser = (props) => (
    <NavItem { ...props }>
        <NavLink tag={ Link } to="/pages/login">
            <i className="fa fa-power-off"></i>
        </NavLink>
    </NavItem>
);
NavbarUser.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
};

export { NavbarUser };
