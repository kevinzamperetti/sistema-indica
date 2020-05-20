import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import { HeaderDemo } from "../../../components/HeaderDemo";
import { Badge, Button, Container, Row, Col, Card, CardTitle, CardBody, 
         CardFooter, CustomInput, Form,  FormGroup,  Label } from '../../../../components';
import Util from '../../../../components/Util/Util';
import API from '../../../../services/api';

export default class CandidatureExternalEdit extends Component {
    constructor( props ) {
        super( props )
        this.util = new Util();
        this.state = {
            candidature: '',
            user: '',
            opportunity: '',
            listCandidatureHistory: []
		}
    }

    componentDidMount() {
        this.listCandidatureById();
    }

    listCandidatureById = async () => {
        const { id } = this.props.match.params
		const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
        const response = await API.get( `/candidature/${id}`, header )
        const responseHistory = await API.get( `/candidatureHistory/${response.data.id}`, header )
        this.setState( { 
            candidature: response.data,
            user: response.data.user,
            opportunity: response.data.opportunity,
            listCandidatureHistory: responseHistory.data,
            candidatureStatus: ''
         }  )
    }

    downloadFile = async ( evt, i ) => {
        const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
        // const FileDownload = require("js-file-download");
        var fileDownload = require('react-file-download');
        await API.get(`/file/downloadFile/${evt.fileNameAttachment}`, header)
        .then( response => {
            fileDownload(response.data, evt.fileNameAttachment);
        } )
        .catch( erro => {
            console.log( "Erro: " + erro ) 
            toast.error(contentError);
        } )
    }
    
    render() {
        const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
        const { candidature, user, opportunity, listCandidatureHistory } = this.state
        const columns = ["Data/Hora", "Situação"];
        const data = listCandidatureHistory.length > 0
                        ? listCandidatureHistory.map( ( candidatureHistory ) => 
                            [ moment( candidatureHistory.creationDate, 'YYYY-MM-DD HH:mm:ss',true).format('DD/MM/YYYY HH:mm:ss'),
                            <Badge pill color={this.util.setCandidatureStatusColor(candidatureHistory.status)}>
                                {this.util.setCandidatureStatusName(candidatureHistory.status)}
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
                                title={'Candidatura para ' + opportunity.name}
                                subTitle={'Código da Oportunidade #' + opportunity.id}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={ 6 }>
                            <Card className="mb-3">
                                <CardBody>
                                    <Form enctype="multipart/form-data">
                                        <FormGroup row>
                                            <Label for="CampaignIdSelector" sm={4}>Oportunidade</Label>
                                            <span>{ opportunity.name }</span>
                                        </FormGroup>
                                        <CardTitle tag="h6" className="mt-4 mb-2">
                                            <b>Informações do candidato:</b>
                                        </CardTitle>
                                        <FormGroup row>
                                            <Label for="input" sm={4}>Nome</Label>
                                            <span>{ candidature.candidateName }</span>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="input" sm={4}>CPF</Label>
                                            <span>{ user.candidateDocumentNumber }</span>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="input" sm={4}>Telefone</Label>
                                            <span>{ candidature.candidatePhoneNumber }</span>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="input" sm={4}>E-mail</Label>
                                            <span>{ candidature.candidateEmail }</span>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="attachment" sm={4}>Currículo</Label>
                                            <Link onClick={ this.downloadFile.bind(this, candidature) }>{ candidature.fileNameAttachment }</Link>
                                        </FormGroup>
                                        <CardTitle tag="h6" className="mt-4 mb-2">
                                            <b>Atualizar situação da candidatura:</b>
                                        </CardTitle>
                                        <FormGroup row>
                                            <Label for="input" sm={4}>Situação atual:</Label>
                                            <span>{ this.util.setCandidatureStatusName(candidature.status) }</span>
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