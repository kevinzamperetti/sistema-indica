import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
// import TableList from '.';

import { 
    Button, ButtonGroup, Table
} from '../../components';

const TableList = (props) => (

    <Table className="mb-0" bordered responsive>
    <thead>
        <tr>
            <th colSpan="2" className="align-middle">{props.title}</th>
        </tr>
    </thead>
    <tbody>
        { props.dataList.length > 0 ?
            <React.Fragment>
                { props.dataList.map( function( data ) { 
                    return (
                        <tr key={data.id}>
                            <td className="align-middle" width='100%'>
                                            <span className="text-inverse">
                                                { data.name }
                                            </span>
                            </td>
                            <td className="align-middle text-right">
                                <ButtonGroup>
                                    {/* <Button color="link" className="text-decoration-none">
                                        <i className="fa fa-edit"></i>
                                    </Button> */}
                                    {/* <Button color="link" className="text-decoration-none" onClick={ this.delete.bind( this ) }>
                                        <i className="fa fa-close"></i>
                                    </Button> */}
                                </ButtonGroup>
                            </td>
                        </tr>
                        ) } 
                    )
                }
            </React.Fragment>
            :
                <tr>
                    <td>
                        <span className="text-inverse">
                            Não existem dados para serem listados
                        </span>
                    </td>
                </tr>
            }
        </tbody>
    </Table>
)

TableList.propTypes = {
    title: PropTypes.string,
    dataList: PropTypes.array
    // children: PropTypes.node.isRequired,
    // addOns: PropTypes.node,
    // style: PropTypes.object,
    // className: PropTypes.string
};
TableList.defaultProps = {
    title: '',
    dataList: []
};

export { TableList };