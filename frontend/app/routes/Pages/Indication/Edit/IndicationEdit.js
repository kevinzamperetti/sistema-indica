import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import { HeaderDemo } from "../../../components/HeaderDemo";
import { 
    Badge, Button, Container, Row, Col, Card, CardTitle, CardBody, CardFooter,
    CustomInput, Form,  FormGroup,  Label,  Input,  FormText, Media
} from '../../../../components';

import Util from '../../../../components/Util/Util';
import API from '../../../../services/api';

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
                Indicação realizada com sucesso!
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
                Erro ao realizar indicação
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

export default class IndicationEdit extends Component {
    constructor( props ) {
        super( props )
        this.util = new Util();
        this.state = {
            indication: '',
            user: '',
            opportunity: '',
            listIndicationHistory: [],
            listKeyWords: []
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
        const responseKeyWord = await API.get( `/keyWord/opportunity/${response.data.opportunity.id}`, header )
        this.setState( { 
            indication: response.data,
            user: response.data.user,
            opportunity: response.data.opportunity,
            listIndicationHistory: responseHistory.data,
            listKeyWords: responseKeyWord.data,
            indicationStatus: ''
         }  )
    }

    changeValuesState( evt ) {
		const { name, value } = evt.target
		this.setState( {
			[name]: value
        })
    }

    downloadFile = async ( evt, i ) => {
        const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
        // const FileDownload = require("js-file-download");
        var fileDownload = require('react-file-download');
        // API.delete( `/keyWord/${evt.id}`, header )
        await API.get(`/file/downloadFile/${evt.fileNameAttachment}`, header)
        .then( response => {
            fileDownload(response.data, evt.fileNameAttachment);
        } )
        .catch( erro => {
            console.log( "Erro: " + erro ) 
            toast.error(contentError);
        } )
    }
    

    edit( evt ) {
        const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
        const { indication, indicationStatus } = this.state
        API.put( `/indication/${indication.id}/updateStatus`, {  
            id: indication.id,
            status: indicationStatus
        }, header )
        .then( response => {
            toast.success(contentSuccess);
            this.listIndicationById();
        } )
        .catch( erro => {
            console.log( "Erro: " + erro ) 
            toast.error(contentError);
        } )
    }

    // save( evt ) {
    //     // evt.preventDefault();
    //     const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
    //     const { opportunityIdSelector, listOpportunities, attachment, indicationName,
    //             indicationPhoneNumber, indicationEmail, status, dataUserLogged,
    //             image, fileNameAttachment, fileDownloadUriAttachment, fileTypeAttachment } = this.state
    //     if ( opportunityIdSelector && listOpportunities && indicationName &&
    //             indicationPhoneNumber && indicationEmail && status && dataUserLogged && image ) {
    //             API.post( '/indication', {  
    //                 user: {
    //                     id: dataUserLogged.id
    //                 },
    //                 opportunity: {
    //                     id: opportunityIdSelector.id
    //                 },	
    //                 indicationName: indicationName,
    //                 indicationPhoneNumber: indicationPhoneNumber,
    //                 indicationEmail: indicationEmail,
    //                 userDocumentNumber: dataUserLogged.documentNumber,
    //                 status: status,
    //                 fileNameAttachment: fileNameAttachment,
    //                 fileDownloadUriAttachment: fileDownloadUriAttachment,
    //                 fileTypeAttachment: fileTypeAttachment
    //         }, header )
    //         .then( response => {
    //             toast.success(contentSuccess);
    //             // console.log( response.data )
    //         } )
    //         .catch( erro => {
    //             console.log( "Erro: " + erro ) 
    //             toast.error(contentError);
    //         } )
    //     } else {
    //         toast.error(errorFillFields);
    //     }
    // }
    
    render() {
        const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
        const { indication, user, opportunity, listIndicationHistory, listKeyWords } = this.state
        const columns = ["Data/Hora", "Situação"];
        const data = listIndicationHistory.length > 0
                        ? listIndicationHistory.map( ( indicationHistory ) => 
                            [ moment( indicationHistory.creationDate, 'YYYY-MM-DD HH:mm:ss',true).format('DD/MM/YYYY HH:mm:ss'),
                            <Badge pill color={this.util.setIndicationStatusColor(indicationHistory.status)}>
                                {this.util.setIndicationStatusName(indicationHistory.status)}
                            </Badge> ] )
                        : []

        const columnsKeyWord = ["Palavra", "Encontrada no Currículo"];
        const dataKeyWord = listKeyWords.length > 0
                        ? listKeyWords.map( ( keyWord ) => 
                            [ keyWord.word,
                            <Badge pill color={this.util.setKeyWordFoundColor(keyWord.found)}>
                                {this.util.setKeyWordFoundName(keyWord.found)}
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
                                            <CustomInput type="select" name="indicationStatus" id="indicationStatus"
                                                         onChange={ this.changeValuesState.bind( this ) }>
                                                <option value="">Selecione...</option>
                                                <option value="IN_PROGRESS">Em andamento</option>
                                                <option value="HIRED">Indicação Contratada</option>
                                                <option value="DISCARDED">Indicação Descartada</option>
                                            </CustomInput>
                                        </FormGroup>                                                
                                    </Form>
                                </CardBody>
                                <CardFooter className="p-3 bt-0">
                                    <div className="d-flex">
                                        <Button color='primary' className="ml-auto px-4" onClick={ this.edit.bind( this ) }>Alterar</Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        </Col>
                        <Col lg={ 6 }>
                            <MUIDataTable
                                title={<b>Histórico</b>}
                                data={data}
                                columns={columns}
                                options={options}/>
                            <br></br>
                            <MUIDataTable
                                title={<b>Palavras Chave<br></br>Quantidade para pré-avaliação automática: {opportunity.automaticEvaluationQuantity}</b>}
                                data={dataKeyWord}
                                columns={columnsKeyWord}
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