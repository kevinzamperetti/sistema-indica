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

export default class Campaign extends Component {
    constructor( props ) {
        super( props )
        this.util = new Util();
        this.state = {
            idCampaign: '',
			name: '',
            expirationDate: '',
            enabled: false,
            listCampaign: [],
            edit: false
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
        const { idCampaign, name, expirationDate, enabled, edit } = this.state
        const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
		if ( name && expirationDate && !edit ) {
            const expirationDateFormatted = moment( expirationDate, 'DD/MM/YYYY',true).format("YYYY-MM-DD");
			API.post( '/campaign', {
                name: name,
                expirationDate: expirationDateFormatted,
                enabled: enabled
			}, header ).then( response => {
                toast.success(this.util.contentSuccess());
                document.getElementById("form-campaign").reset();
                this.listAllCampaigns();
			} )
			.catch( error => {
                toast.error(this.util.contentError(error.response.data.message));
            } )
        } else if ( idCampaign && name && expirationDate && edit ) {
            const expirationDateFormatted = moment( expirationDate, 'DD/MM/YYYY',true).format("YYYY-MM-DD");
			API.put( `/campaign/${idCampaign}`, {
                id: idCampaign,
                name: name,
                expirationDate: expirationDateFormatted,
                enabled: enabled
			}, header ).then( response => {
                toast.success(this.util.contentSuccess());
                document.getElementById("form-campaign").reset();
                this.listAllCampaigns();
			} )
			.catch( error => {
                toast.error(this.util.contentError(error.response.data.message));
            } )
        } else {
            toast.error(this.util.errorFillFields());
        }
    }

    delete( evt, c ) {
        const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
        API.delete( `/campaign/${evt.id}`, header)
        .then( response => {
        toast.success(this.util.contentSuccess());
        this.listAllCampaigns();
        } )
        .catch( error => {
            toast.error(this.util.contentError(error.response.data.message))
        } )
    }

    fillForm( campaign ) {
        this.setState( { 
            idCampaign: campaign.id,
            name: campaign.name,
            enabled: campaign.enabled,
            expirationDate: moment(campaign.expirationDate, "YYYY-MM-DD", true).format("DD/MM/YYYY"),
            edit: true
         }  )
    }

    render() {
        const { listCampaign, name, expirationDate } = this.state
        const columns = ["Nome", "Data de Expiração", "Situação", "", ""];
        const data = listCampaign.length > 0
                        ? listCampaign.map( ( campaign ) => 
                            [ campaign.name, moment(campaign.expirationDate, "YYYY-MM-DD", true).format("DD/MM/YYYY"),
                              <Badge pill color={this.util.setEnabledColor(campaign.enabled)}>
                                {this.util.setEnabledName(campaign.enabled)}
                              </Badge>,
                              <Link className="fa fa-edit" onClick={ this.fillForm.bind( this, campaign ) }/>,
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
                                    <Form id="form-campaign">
                                    {/* <Form onSubmit={ this.save.bind( this ) }> */}
                                        <FormGroup row>
                                            <Label for="input" sm={3}>
                                                Nome
                                            </Label>
                                            <Col sm={9}>
                                                <Input type="text" name="name" id="name" placeholder="" defaultValue={name}
                                                       onBlur={ this.changeValuesState.bind( this ) }/>
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
                                                    defaultValue={expirationDate}
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
    //             toast.success(this.util.contentSuccess());
    // }
}