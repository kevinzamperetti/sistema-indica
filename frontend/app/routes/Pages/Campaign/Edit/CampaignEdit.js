import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import MaskedInput from 'react-text-mask';
import Toggle from 'react-toggle';
import moment from 'moment';

import { 
    Button,
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardFooter,
    Form, 
    FormGroup, 
    Label,
    Media,
    Input
} from '../../../components';

import { HeaderDemo } from "../../components/HeaderDemo";

import API from '../../../services/api';
import Util from '../../../../components/Util/Util';

export default class CampaignEdit extends Component {
    constructor( props ) {
        super( props )
        this.util = new Util();
        this.state = {
			name: '',
            expirationDate: '',
            enabled: false
        }
    }

    changeValuesState( evt ) {
		const { name, value } = evt.target
		// this.validarEmail( evt )
		this.setState( {
			[name]: value
        })
    }
    
    save( evt ) {
		evt.preventDefault();
        const { name, expirationDate, enabled } = this.state
		if ( name && expirationDate ) {
            const expirationDateFormatted = moment( expirationDate, 'DD/MM/YYYY',true).format("YYYY-MM-DD");
			API.post( '/campaign', {
                name: name,
                expirationDate: expirationDateFormatted,
                enabled: enabled
			} ).then( response => {
                toast.success(this.util.contentSuccess());
				this.setState({redirect: true})
				// this.props.history.push( "/pages/login" )
				// this.salvarImagem(response.data.id, imagem)
			//this.props.history.push( "/login" )
			} )
			.catch( error => {
                toast.error(this.util.contentError(error.response.data.message));
            } )
        } else {
            toast.error(this.util.errorFillFields());
        }
	}

    render() {
        return (
            <React.Fragment>
                <Container>
                    <Row> 
                        <Col lg={ 12 }>
                            <HeaderDemo 
                                no=''
                                title="Cadastro de Campanhas de Indicação" 
                                subTitle={(
                                    <React.Fragment>
                                        Visualize e cadastre campanhas de indicação.
                                    </React.Fragment>
                                )}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={ 12 }>
                            <Card className="mb-3">
                                <CardBody>
                                    <Form>
                                    {/* <Form onSubmit={ this.save.bind( this ) }> */}
                                        <FormGroup row>
                                            <Label for="input" sm={3}>
                                                Nome
                                            </Label>
                                            <Col sm={9}>
                                                <Input type="text" name="name" id="name" placeholder="" onBlur={ this.changeValuesState.bind( this ) }/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="input" sm={3}>
                                                Data de Expiração
                                            </Label>
                                            <Col sm={9}>
                                                <Input
                                                    mask={ [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] }
                                                    placeholder='01/01/1970'
                                                    tag={ MaskedInput }
                                                    name="expirationDate"
                                                    id="expirationDate"
                                                    onBlur={ this.changeValuesState.bind( this ) }/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="input" sm={3}>
                                                Ativo
                                            </Label>
                                            <Col sm={9}>
                                                <Toggle
                                                    checked={ this.state.enabled }
                                                    name='enabled'
                                                    value='true'
                                                    onChange={ () => { this.setState({ enabled: !this.state.enabled }) } }/>
                                            </Col>
                                        </FormGroup>
                                        {/* <Button color="link" onClick={ this._showHandler } className="ml-2">Toast</Button> */}
                                    </Form>
                                </CardBody>
                                <CardFooter className="p-4 bt-0">
                                    <div className="d-flex">
                                        <div className="l-flex">
                                            <Button color='secondary' className="ml-auto px-4" onClick={ this.save.bind( this ) }>Excluir</Button>
                                        </div>
                                        <Button color='primary' className="ml-auto px-4" onClick={ this.save.bind( this ) }>Salvar</Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                    <ToastContainer 
                    position='top-right'
                    autoClose={3000}
                    draggable={false}
                    hideProgressBar={true}
                    />
                </Container>
            </React.Fragment>
        )
    }

    // _showHandler = () => {
    //             toast.success(this.util.contentSuccess());
    // }
}