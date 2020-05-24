import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import { HeaderDemo } from "../../../components/HeaderDemo";
import { Badge, Button, Container, Row, Col, Card, CardTitle, CardBody, 
         CardFooter, Form,  FormGroup,  Label } from '../../../../components';
import Util from '../../../../components/Util/Util';
import API from '../../../../services/api';

export default class IndicationExternalEdit extends Component {
    constructor( props ) {
        super( props )
        this.util = new Util();
        this.state = {
            indication: '',
            user: '',
            opportunity: '',
            listIndicationHistory: []
		}
    }

    componentDidMount() {
        this.listIndicationById();
    }

    listIndicationById = async () => {
        const { id } = this.props.match.params
		const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
        const response = await API.get( `/indication/${id}`, header )
        const responseHistory = await API.get( `/indicationHistory/${response.data.id}`, header )
        this.setState( { 
            indication: response.data,
            user: response.data.user,
            opportunity: response.data.opportunity,
            listIndicationHistory: responseHistory.data,
            indicationStatus: ''
         }  )
    }

    downloadFile = async ( evt, i ) => {
        // const FileDownload = require("js-file-download");
        var fileDownload = require('react-file-download');
        await API.get(`/file/downloadFile/${evt.fileNameAttachment}`,
                        { responseType: 'arraybuffer',
                          headers: { Authorization: localStorage.getItem('Authorization')} } )
        .then( response => {
            fileDownload(response.data, evt.fileNameAttachment, evt.fileTypeAttachment);
        } )
        .catch( error => {
            toast.error(this.util.contentError(error.response.data.message));
        } )
    }
    
    render() {
        const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
        const { indication, user, opportunity, listIndicationHistory } = this.state
        const columns = ["Data/Hora", "Situação"];
        const data = listIndicationHistory.length > 0
                        ? listIndicationHistory.map( ( indicationHistory ) => 
                            [ moment( indicationHistory.creationDate, 'YYYY-MM-DD HH:mm:ss',true).format('DD/MM/YYYY HH:mm:ss'),
                            <Badge pill color={this.util.setIndicationStatusColor(indicationHistory.status)}>
                                {this.util.setIndicationStatusName(indicationHistory.status)}
                            </Badge> ] )
                        : []
        const options = this.util.optionsMUIDataTableForHistory

        return (
            <React.Fragment>
                <Container>
                    <Row> 
                        <Col lg={ 12 }>
                            <HeaderDemo 
                                no=''
                                title={'Indicação para ' + opportunity.name}
                                subTitle={'Código da Oportunidade #' + opportunity.id}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={ 6 }>
                            <Card className="mb-3">
                                <CardBody>
                                    <Form enctype="multipart/form-data">
                                        <CardTitle tag="h6" className="mt-4 mb-2">
                                            <b>Informações do usuário que está realizando a indicação:</b>
                                        </CardTitle>
                                        <FormGroup row>
                                            <Label for="input" sm={4}>Nome</Label>
                                            <span>{ user.name }</span>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="input" sm={4}>CPF</Label>
                                            <span>{ user.documentNumber }</span>
                                        </FormGroup>
                                        <CardTitle tag="h6" className="mt-4 mb-2">
                                            <b>Informações da pessoa indicada:</b>
                                        </CardTitle>
                                        <FormGroup row>
                                            <Label for="CampaignIdSelector" sm={4}>Oportunidade</Label>
                                            <span>{ opportunity.name }</span>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="input" sm={4}>Nome</Label>
                                            <span>{ indication.indicationName }</span>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="input" sm={4}>Telefone</Label>
                                            <span>{ indication.indicationPhoneNumber }</span>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="input" sm={4}>E-mail</Label>
                                            <span>{ indication.indicationEmail }</span>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="attachment" sm={4}>Currículo</Label>
                                            <Link onClick={ this.downloadFile.bind(this, indication) }>{ indication.fileNameAttachment }</Link>
                                        </FormGroup>
                                        <CardTitle tag="h6" className="mt-4 mb-2">
                                            <b>Atualizar situação da indicação:</b>
                                        </CardTitle>
                                        <FormGroup row>
                                            <Label for="input" sm={4}>Situação atual:</Label>
                                            <span>{ this.util.setIndicationStatusName(indication.status) }</span>
                                        </FormGroup>                                                
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg={ 6 }>
                            <MUIDataTable
                                title={<b>Histórico</b>}
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
                <CardFooter className="mt-4 mb-2 p-8 bt-0">
                    <div className="d-flex">
                        <Button onClick={this.util.goPreviousPage.bind(this)} color="link" className='mr-3'>
                            <i className='fa fa-angle-left mr-2'></i>
                            Voltar
                        </Button>
                    </div>
                </CardFooter>
            </React.Fragment>
        )
    }
}