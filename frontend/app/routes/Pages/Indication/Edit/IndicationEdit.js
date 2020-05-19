import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { createNumberMask, emailMask } from 'text-mask-addons';
import { HeaderDemo } from "../../../components/HeaderDemo";
import { 
    Button, Container, Row, Col, Card, CardTitle, CardBody, CardFooter,
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
            listIndicationHistory: ''
		}
    }

    componentDidMount() {
        this.listIndicationById();
        // this.listIndicationHistory();
    }

    listIndicationById = async () => {
        const { id } = this.props.match.params
		const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
        const response = await API.get(  `/indication/${id}`, header )
        this.setState( { 
            indication: response.data,
            user: response.data.user,
            opportunity: response.data.opportunity
         }  )
    }

    // listIndicationHistory = async () => {
	// 	const header = { headers: { Authorization: localStorage.getItem('Authorization') } }
    //     const response = await API.get( "/indicationHistory/", header )
    //     this.setState( { listIndicationHistory: response.data } )
    // } 

    // changeValuesState( evt ) {
	// 	const { name, value } = evt.target
	// 	this.setState( {
	// 		[name]: value
    //     })
    // }


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
        const { indication, user, opportunity, listIndicationHistory } = this.state
        const columns = ["Data/Hora", "Situação"];
        const data = listIndicationHistory.length > 0
                        ? listIndicationHistory.map( ( indicationHistory ) => 
                            [ indicationHistory.word,
                              <Link className="fa fa-close" onClick={ this.delete.bind( this, indicationHistory ) }/>
                            ] )
                        : []
        const options = this.util.optionsMUIDataTableWithOutPrintAndFilter
        return (
            <React.Fragment>
                <Container>
                    <Row> 
                        <Col lg={ 12 }>
                            <HeaderDemo 
                                no=''
                                title="Realizar indicação" 
                                subTitle="Aqui é possível realizar a indicação de pessoas conhecidas em alguma de nossas oportunidades em aberto."
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={ 12 }>
                            <Card className="mb-3">
                                <CardBody>
                                    <Form enctype="multipart/form-data">
                                        <FormGroup row>
                                            <Label for="input" sm={3}>Situação:</Label>
                                            <span>{ indication.status }</span>
                                        </FormGroup>                                                
                                        <CardTitle tag="h6" className="mt-4 mb-2">
                                            <b>Informações do usuário que está realizando a indicação:</b>
                                        </CardTitle>
                                        <FormGroup row>
                                            <Label for="input" sm={3}>Nome</Label>
                                            <span>{ user.name }</span>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="input" sm={3}>CPF</Label>
                                            <span>{ user.documentNumber }</span>
                                        </FormGroup>
                                        <CardTitle tag="h6" className="mt-4 mb-2">
                                            <b>Informações da pessoa indicada:</b>
                                        </CardTitle>
                                        <FormGroup row>
                                            <Label for="CampaignIdSelector" sm={3}>Oportunidade</Label>
                                            <span>{ opportunity.name }</span>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="input" sm={3}>Nome</Label>
                                            <span>{ indication.indicationName }</span>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="input" sm={3}>Telefone</Label>
                                            <span>{ indication.indicationPhoneNumber }</span>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="input" sm={3}>E-mail</Label>
                                            <span>{ indication.indicationEmail }</span>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="attachment" sm={3}>Currículo</Label>
                                            {/* <Button onClick={ this.downloadFile.bind.(this, indication) }>{indication.fileNameAttachment}</Button> */}
                                            {/* <Link onClick={ this.downloadFile.bind(this, indication) } download>{ indication.fileNameAttachment }</Link> */}
                                            
                                            {/* <Button onClick={ this.downloadFile.bind(this, indication) }>{ indication.fileNameAttachment }</Button> */}
                                            
                                            <Link onClick={ this.downloadFile.bind(this, indication) }>{ indication.fileNameAttachment }</Link>

                                            {/* <Link to={ API.get(`/file/downloadFile/${indication.fileNameAttachment}`, header) } target="_blank" download>
                                                { indication.fileNameAttachment }
                                            </Link> */}

                                            {/* <a href={ fetch(`http://localhost:8080/api/file/downloadFile/${indication.fileNameAttachment}`, header ) }
                                               target="_blank" 
                                               rel="noopener noreferrer" 
                                               download>{indication.fileNameAttachment}</a> */}
                                        </FormGroup>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    {/* <Row>
                        <Col>
                            <MUIDataTable
                                title={""}
                                data={data}
                                columns={columns}
                                options={options}/>
                        </Col>
                    </Row> */}
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
}