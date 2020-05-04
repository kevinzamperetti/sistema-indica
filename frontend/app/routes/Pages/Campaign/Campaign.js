import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import MaskedInput from 'react-text-mask';
import Toggle from 'react-toggle';
import moment from 'moment';
import { HeaderDemo } from "../../components/HeaderDemo";
//import { AdvancedTableA } from '../../Tables/ExtendedTable/components'
// import { CampaignList } from './CampaignList/CampaignList'
import { 
    Button, ButtonGroup , Container, Row, Col, Card, CardBody, CardFooter,
    Form, FormGroup, Label, Media, Input,Table
} from '../../../components';


import { TableList } from '../../../components/Tables/TableList';

import API from '../../../services/api';

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
                Campanha de Indicação cadastrado com sucesso!
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
        this.state = {
			name: '',
            expirationDate: '',
            enabled: false,
            listCampaign: []
        }
    }

    componentWillMount() {
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
			API.post( '/campaign', {
                name: name,
                expirationDate: expirationDateFormatted,
                enabled: enabled
			} ).then( response => {
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
    
    render() {
        const { listCampaign } = this.state
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
                            {/* <CampaignList /> */}
                            {/* <TableList title="Campanhas de Indicação" dataList={listCampaign} /> */}
                            <Table className="mb-0" bordered responsive>
                                <thead>
                                    <tr>
                                        <th colSpan="4" className="align-middle">Campanhas de Indicação cadastradas</th>
                                    </tr>
                                </thead>
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Data de Expiração</th>
                                        <th>Situação</th>
                                        <th colSpan="2" className="align-center">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { listCampaign.length > 0 ?
                                        <React.Fragment>
                                            { listCampaign.map( function( campaign ) { 
                                                return (
                                                    <tr key={campaign.id}>
                                                        <td className="align-self-center" width='100%'>
                                                            <span className="text-inverse"> { campaign.name } </span>
                                                        </td>
                                                        <td className="align-middle" width='100%'>
                                                            <span className="text-inverse"> { campaign.expirationDate } </span>
                                                        </td>
                                                        <td className="align-middle" width='100%'>
                                                            <span className="text-inverse"> { campaign.enabled === true ? 'Ativo' : 'Inativo' } </span>
                                                        </td>
                                                        <td className="align-middle text-right">
                                                            <ButtonGroup>
                                                                <Button color="link" className="text-decoration-none">
                                                                    <i className="fa fa-edit"></i>
                                                                </Button>
                                                                <Button color="link" className="text-decoration-none">
                                                                    <i className="fa fa-close"></i>
                                                                </Button>
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