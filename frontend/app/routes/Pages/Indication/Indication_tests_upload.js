import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import MaskedInput from 'react-text-mask';
import { createNumberMask, emailMask } from 'text-mask-addons';
import { HeaderDemo } from "../../components/HeaderDemo";
import { 
    Button, Container, Row, Col, Card, CardTitle, CardBody, CardFooter,
    CustomInput, Form,  FormGroup,  Label,  Input,  FormText, Media
} from '../../../components';

import API from '../../../services/api';
import Util from '../../../components/Util/Util';

export default class Indication extends Component {
    constructor( props ) {
        super( props )
        this.util = new Util();
        this.state = {
            // userId: '',
            opportunityIdSelector: '',
            listOpportunities: '',
            attachment: '', //falta implementar anexo...
            indicationName: '',
            indicationPhoneNumber: '',
            indicationEmail: '',
            //userDocumentNumber: '',
            status: 'NEW',
            dataUserLogged: {},
            image: '',
            imageName: ''
		}
    }

    componentDidMount() {
        this.getDataUserLogged() && this.listAllOpportunities();
    }

    getDataUserLogged = async () => {
        const name = localStorage.getItem('Name');
        const profile = localStorage.getItem('Profile');
        const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
		const response = await API.get( `/user/name/?name=${name}&profile=${profile}`, header )
        this.setState( { dataUserLogged: response.data } )
    }

    listAllOpportunities = async () => {
		const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
        const response = await API.get( '/opportunity?enabled=true', header )
        this.setState( { listOpportunities: response.data }  )
    }

    changeValuesState( evt ) {
		const { name, value } = evt.target
		this.setState( {
			[name]: value
        })
    }

    changeValuesStateOpportunity( evt ) {
		let { listOpportunities } = this.state
		let { name } = evt.target
		const itemID = evt.target.value
		const res = listOpportunities.find( p => p.id == itemID )
		this.setState( { 
            [name] : res
		} )
    }

    changeValuesStateImage = evt => {
        console.log( evt.target.files[0] )
        const arquivo = Array.from( evt.target.files )
        const formData = new FormData()
        formData.append( "file", arquivo[0] )
        this.setState( {
          image: formData,
          imageName: arquivo[0].name
        } )
        console.log('image: ' + this.state.image)
      }

    //   save( evt ) {
    //     evt.preventDefault();
    //     const header = { headers: {Authorization: localStorage.getItem('Authorization'), 'Content-type': 'multipart/form-data' } }
    //     const { image } = this.state
    //     if ( image ) {
    //         API.post( '/file/uploadFile', this.state.image, header )
    //         .then( response => {
    //             toast.success(this.util.contentSuccess());
    //             // console.log( response.data )
    //         } )
    //         .catch( error => {
    //             toast.error(this.util.contentError(error.response.data.message));
    //         } )
    //     } else {
    //         toast.error(this.util.errorFillFields());
    //     }
    // }

    // save( evt ) {
    //     evt.preventDefault();
    //     const header = { headers: {Authorization: localStorage.getItem('Authorization'), params: {'Content-type': 'multipart/form-data'} } }
    //     console.log('header: ' + header)
    //     const { opportunityIdSelector, listOpportunities, attachment, indicationName,
    //             indicationPhoneNumber, indicationEmail, status,
    //             dataUserLogged, image } = this.state
    //     if ( opportunityIdSelector && listOpportunities && indicationName &&
    //          indicationPhoneNumber && indicationEmail && status, dataUserLogged ) {
            
    //         // const response = API.fetch('http://localhost:8080/api/indication', {
    //         //     method: 'POST',
    //         //     headers: { 'Content-Type': 'multipart/form-data' },
    //         //     body:  {
    //         //                 user: {
    //         //                     id: dataUserLogged.id
    //         //                 },
    //         //                 opportunity: {
    //         //                     id: opportunityIdSelector.id
    //         //                 },	
    //         //                 indicationName: indicationName,
    //         //                 indicationPhoneNumber: indicationPhoneNumber,
    //         //                 indicationEmail: indicationEmail,
    //         //                 userDocumentNumber: dataUserLogged.documentNumber,
    //         //                 status: status,
    //         //     },
    //         //     params: image
    //         // } )

    //         // API.post( '/indication', {  
    //         //     user: {
    //         //         id: dataUserLogged.id
    //         //     },
    //         //     opportunity: {
    //         //         id: opportunityIdSelector.id
    //         //     },	
    //         //     indicationName: indicationName,
    //         //     indicationPhoneNumber: indicationPhoneNumber,
    //         //     indicationEmail: indicationEmail,
    //         //     userDocumentNumber: dataUserLogged.documentNumber,
    //         //     status: status
    //         // }, header, this.state.image )

    //         var formData = new FormData();
    //         formData.append("indication", JSON.stringify({
    //             user: {
    //                 id: dataUserLogged.id
    //             },
    //             opportunity: {
    //                 id: opportunityIdSelector.id
    //             },	
    //             indicationName: indicationName,
    //             indicationPhoneNumber: indicationPhoneNumber,
    //             indicationEmail: indicationEmail,
    //             userDocumentNumber: dataUserLogged.documentNumber,
    //             status: status
    //         }));
    //         formData.append("file", this.state.image);

    //         const response = fetch("http://localhost:8080/api/indication", {
    //             method: "POST",
    //             headers: { 
    //                  Authorization: localStorage.getItem('Authorization'),
    //                  'Content-type': 'multipart/form-data'
    //             },
    //             body: formData
    //         })
    //         console.log(response)
    //         // .then( response => {
    //         //     toast.success(this.util.contentSuccess());
    //         //     // console.log( response.data )
    //         // } )
    //         // .catch( error => {
    //         //     toast.error(this.util.contentError(error.response.data.message));
    //         // } )
    //     } else {
    //         toast.error(this.util.errorFillFields());
    //     }
    // }

    save( evt ) {
            evt.preventDefault();
            // const header = { headers: {Authorization: localStorage.getItem('Authorization'), params: {'Content-type': 'multipart/form-data'} } }
            const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
            // console.log('header: ' + header)
            const { opportunityIdSelector, listOpportunities, attachment, indicationName,
                    indicationPhoneNumber, indicationEmail, status,
                    dataUserLogged, image } = this.state
            if ( opportunityIdSelector && listOpportunities && indicationName &&
                 indicationPhoneNumber && indicationEmail && status, dataUserLogged ) {
                
                API.post( '/indication', {  
                    user: {
                        id: dataUserLogged.id
                    },
                    opportunity: {
                        id: opportunityIdSelector.id
                    },	
                    indicationName: indicationName,
                    indicationPhoneNumber: indicationPhoneNumber,
                    indicationEmail: indicationEmail,
                    userDocumentNumber: dataUserLogged.documentNumber,
                    status: status,
                    filex: image
                }, header )
   
                console.log(response)
                .then( response => {
                    toast.success(this.util.contentSuccess());
                    // console.log( response.data )
                } )
                .catch( error => {
                    toast.error(this.util.contentError(error.response.data.message));
                } )
            } else {
                toast.error(this.util.errorFillFields());
            }
        }
    
    render() {
        const { listOpportunities, dataUserLogged } = this.state
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
                                        <CardTitle tag="h6" className="mt-5 mb-4">
                                            Informações do usuário que está realizando a indicação:
                                        </CardTitle>
                                        <FormGroup row>
                                            <Label for="input" sm={3}>Nome</Label>
                                            <Col sm={9}>
                                                <Input type="text" name="name" id="name"
                                                       value={ dataUserLogged.name } placeholder="" readOnly/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="input" sm={3}>CPF</Label>
                                            <Col sm={9}>
                                                <Input
                                                    mask={ [/\d/, /\d/,  /\d/, '.', /\d/,  /\d/, /\d/, '.',  /\d/, /\d/, /\d/, '-', /\d/, /\d/] }
                                                    keepCharPositions={ true }
                                                    tag={ MaskedInput }
                                                    name="documentNumber"
                                                    value={dataUserLogged.documentNumber}
                                                    id="documentNumber" readOnly/>
                                            </Col>                                                
                                        </FormGroup>
                                        <CardTitle tag="h6" className="mt-5 mb-4">
                                            Informações de quem deseja indicar:
                                        </CardTitle>
                                        <FormGroup row>
                                            <Label for="CampaignIdSelector" sm={3}>Oportunidade</Label>
                                            <Col sm={9}>
                                                <CustomInput type="select" name="opportunityIdSelector" id="opportunityIdSelector" onChange={ this.changeValuesStateOpportunity.bind( this ) } >
                                                    <option value="" selected>Selecione...</option>
                                                    { listOpportunities.length > 0 ?
                                                        <React.Fragment>
                                                            { listOpportunities.map( ( opportunity ) => { 
                                                                return(
                                                                    <option key={opportunity.id} id={ opportunity.id } value={ opportunity.id } onChange={ this.changeValuesStateOpportunity.bind( this ) }>{ opportunity.name }</option>
                                                                )
                                                            } ) }
                                                        </React.Fragment>
                                                    :
                                                        <option value="Não existem oportunidades cadastradas">Não existem oportunidades cadastradas</option>
                                                    }
                                                </CustomInput>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="input" sm={3}>Nome</Label>
                                            <Col sm={9}>
                                                <Input type="text" name="indicationName" id="indicationName" placeholder=""
                                                       onBlur={ this.changeValuesState.bind( this ) }/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="input" sm={3}>Telefone</Label>
                                            <Col sm={9}>
                                                <Input
                                                    mask={ ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/] }
                                                    placeholder='(51) 99000-0000'
                                                    tag={ MaskedInput }
                                                    id="indicationPhoneNumber"
                                                    name="indicationPhoneNumber"
                                                    onBlur={ this.changeValuesState.bind( this ) }/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="input" sm={3}>E-mail</Label>
                                            <Col sm={9}>
                                                <Input
                                                    mask={ emailMask }
                                                    placeholder='nome@teste.com'
                                                    tag={ MaskedInput }
                                                    id="indicationEmail"
                                                    name="indicationEmail"
                                                    onBlur={ this.changeValuesState.bind( this ) }/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="attachment" sm={3}>Currículo</Label>
                                            <Col sm={9}>
                                                <CustomInput type="file" id="attachment" name="attachment" label="Selecionar arquivo"
                                                             enctype="multipart/form-data"
                                                             //onBlur={ this.changeValuesState.bind( this ) }
                                                             onChange = { this.changeValuesStateImage.bind( this ) } />
                                                <FormText color="muted">
                                                    Formato aceito: PDF. Tamanho máximo: 10Mb
                                                </FormText>
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                </CardBody>
                                <CardFooter className="p-4 bt-0">
                                    <div className="d-flex">
                                        <Button color='primary' className="ml-auto px-4" onClick={ this.save.bind( this ) }>Indicar</Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {/* <CampaignList /> */}
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
}