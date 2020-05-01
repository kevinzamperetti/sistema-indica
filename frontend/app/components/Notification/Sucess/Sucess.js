import React from 'react';
import PropTypes from 'prop-types';

export default class Success extends React.Component {
    static propTypes = {
        closeToast: PropTypes.node
    }

    render() {
        const { closeToast } = this.props;

        return (
            <React.Fragment>
                <Media>
                    <Media middle left className="mr-3">
                        <i className="fa fa-fw fa-2x fa-check"></i>
                    </Media>
                    <Media body>
                        <Media heading tag="h6">
                            Successo!
                        </Media>
                        <p>
                            Campanha de Indicação salva com sucesso!
                        </p>
                        <div className="d-flex mt-2">
                            <Button color="success" onClick={() => { closeToast }} >
                                Ok
                            </Button>
                            <Button color="link" onClick={() => { closeToast }}  className="ml-2 text-success">
                                Cancelar
                            </Button>
                        </div>
                    </Media>
                </Media>
            </React.Fragment>
        )
    }
}