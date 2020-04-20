import React from 'react';
import PropTypes from 'prop-types';

const FooterText = (props) => (
	<React.Fragment>
		(C) { props.year } Desenvolvido por {' '}
		<a
			href="https://www.linkedin.com/in/kevin-zamperetti-schepke/"
			target="_blank"
			rel="noopener noreferrer"
			className="sidebar__link"
		>
			Kevin Zamperetti Schepke
		</a>
	</React.Fragment>
)
FooterText.propTypes = {
	year: PropTypes.node,
	// name: PropTypes.node,
	// desc: PropTypes.node,
};

FooterText.defaultProps = {
    year: "2020",
    // name: "Admin Theme",
    // desc: "Bootstrap 4, React 16 (latest) & NPM"
};

export { FooterText };
