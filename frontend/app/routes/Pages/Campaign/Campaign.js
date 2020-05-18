import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import MaskedInput from 'react-text-mask';
import Toggle from 'react-toggle';
import moment from 'moment';
import { HeaderDemo } from "../../components/HeaderDemo";
import { 
    Badge, Button, Container, Row, Col, Card, CardBody, CardFooter,
    Form, FormGroup, Label, Media, Input
} from '../../../components';

import Util from '../../../components/Util/Util';
import API from '../../../services/api';

import {
    createAutoCorrectedDatePipe,
    createNumberMask,
    emailMask
} from 'text-mask-addons';

// const autoCorrectedDatePipe = createAutoCorrectedDatePipe('mm/dd/yyyy');
const dolarsMask = createNumberMask({ prefix: '$' });

// ========== Toast Contents: ============
// eslint-disable-next-line react/prop-types
const contentSuccess = ({ closeToast }) => (
    <Media>
        <Media middle left className="mr-3">
            <i className="fa fa-fw fa-2x fa-check"></i>
        </Media>
        <Media body>
            <Media heading tag="h6">
                Successo!
            </Media>
            <p>
                {/* Campanha de Indicação cadastrado com sucesso!
                    porque ta valendo pro save e delete */}
            </p>
        </Media>
    </Media>
);

// eslint-disable-next-line react/prop-types
const contentError = ({ closeToast }) => (
    <Media>
        <Media middle left className="mr-3">
            <i className="fa fa-fw fa-2x fa-close"></i>
        </Media>
        <Media body>
            <Media heading tag="h6">
                Erro!
            </Media>
            <p>
                Erro ao salvar dados
            </p>
        </Media>
    </Media>
);

// eslint-disable-next-line react/prop-types
const errorFillFields = ({ closeToast }) => (
    <Media>
        <Media middle left className="mr-3">
            <i className="fa fa-fw fa-2x fa-close"></i>
        </Media>
        <Media body>
            <Media heading tag="h6">
                Erro!
            </Media>
            <p>
                Existem campos não preeenchidos.
            </p>
        </Media>
    </Media>
);

export default class Campaign extends Component {
    constructor( props ) {
        super( props )
        this.util = new Util();
        this.state = {
			name: '',
            expirationDate: '',
            enabled: false,
            listCampaign: []
        }
    }

    componentDidMount() {
        this.listAllCampaigns();
    }

    changeValuesState( evt ) {
		const { name, value } = evt.target
		// this.validarEmail( evt )
		this.setState( {
			[name]: value
        })
    }
    
    listAllCampaigns = async () => {
        const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
		const response = await API.get( '/campaign', header )
        this.setState( { listCampaign: response.data }  )
    }

    save( evt ) {
		evt.preventDefault();
        const { name, expirationDate, enabled } = this.state
		if ( name && expirationDate ) {
            const expirationDateFormatted = moment( expirationDate, 'DD/MM/YYYY',true).format("YYYY-MM-DD");
            const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
			API.post( '/campaign', {
                name: name,
                expirationDate: expirationDateFormatted,
                enabled: enabled
			}, header ).then( response => {
                toast.success(contentSuccess);
                this.listAllCampaigns();
			//this.props.history.push( "/login" )
			} )
			.catch( erro => {
                console.log( "Erro: " + erro ) 
                toast.error(contentError);
            } )
        } else {
            toast.error(errorFillFields);
        }
    }

    delete( evt, c ) {
        const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
        API.delete( `/campaign/${evt.id}`, header)
        .then( response => {
        toast.success(contentSuccess);
        this.listAllCampaigns();
        } )
        .catch( erro => {
            console.log( "Erro: " + erro ) 
            toast.error(contentError);
        } )
    }

    render() {
        const { listCampaign } = this.state
        const columns = ["Nome", "Data de Expiração", "Situação", ""];
        const data = listCampaign.length > 0
                        ? listCampaign.map( ( campaign ) => 
                            [ campaign.name, moment(campaign.expirationDate, "YYYY-MM-DD", true).format("DD/MM/YYYY"),
                              <Badge pill color={this.util.setEnabledColor(campaign.enabled)}>
                                {this.util.setEnabledName(campaign.enabled)}
                              </Badge>,
                              <Link className="fa fa-close" onClick={ this.delete.bind( this, campaign ) }/>
                            ] )
                        : []
        const options = this.util.optionsMUIDataTable;
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
                                        <Button color='primary' className="ml-auto px-4" onClick={ this.save.bind( this ) }>Cadastrar</Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <MUIDataTable
                                title={""}
                                data={data}
                                columns={columns}
                                options={options}/>
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
    //             toast.success(contentSuccess);
    // }
}