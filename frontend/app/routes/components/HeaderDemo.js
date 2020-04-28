import React from 'react';
import PropTypes from 'prop-types';
import { Media } from 'reactstrap';

const HeaderDemo = (props) => (
    <Media className={ `mb-3 ${ props.className }` }>
        <Media left top>
            <h1 className="mr-3 display-4 text-muted">
                {/* {props.no}.  */}
                {props.no}
            </h1>
        </Media>
        <Media body>
            <h1 className="mt-1">
                {props.title}
            </h1>
            <p>{props.children || props.subTitle}</p>
        </Media>
    </Media>
)
HeaderDemo.propTypes = {
    no: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    title: PropTypes.string,
    subTitle: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string
};
HeaderDemo.defaultProps = {
    no: '',
    title: "Waiting for Data...",
    subTitle: "Waiting for Data..."
};

export { HeaderDemo };
