import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ThemeConsumer } from '../../../components/Theme';

const logos = {
    'default': require('./../../../images/logos/logo-indica.me.png'),
    'menu': require('./../../../images/logos/logo-indica.me-menu.png')    
}

// Check for background
const getLogoUrlBackground = () => {
    return logos['default'];
}

const getLogoUrlBackgroundMenu = () => {
    return logos['menu'];
}

const LogoThemed = ({ checkBackground, checkBackgroundMenu, className, ...otherProps }) => (
    <ThemeConsumer>
    {
        ({ style, color }) => (
            <img
                src={
                    checkBackgroundMenu ?
                         getLogoUrlBackgroundMenu():
                         getLogoUrlBackground()
                }
                className={ classNames('d-block', className) }
                alt="Indica.Me Logo"
                { ...otherProps }
            />
        )
    }
    </ThemeConsumer>
);
LogoThemed.propTypes = {
    checkBackgroundMenu: PropTypes.bool,
    checkBackground: PropTypes.bool,
    className: PropTypes.string,
};

export { LogoThemed };
