import React, { Component } from 'react';
import MaskedInput from 'react-text-mask';
import { ToastContainer, toast } from 'react-toastify';
import { Container, Row, Col, Input, Card, Button, CardBody, CardFooter, 
         FormText, CardTitle, CustomInput, Label, FormGroup, Media, Form } from '../../../components';
import { HeaderMain } from "../../components/HeaderMain";
import { ProfileLeftNav } from "../../components/Profile/ProfileLeftNav";
import { ProfileHeader } from "../../components/Profile/ProfileHeader";

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
                Dados de usuário alterados com sucesso!
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
                Erro ao alterar dados
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

export default class ProfileExternalEdit extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            name: '',
            email: '',
            password: '',
            profileSelector: 'EXTERNAL',
            profile: '',
            documentNumber: '',
            isCollaborator: false,
            bankDataId: '',
            bankAgency: '',
            bankAccount: '',
        }
    }

    componentDidMount() {
        this.getDataUserLogged()
    }
  
    getDataUserLogged = async () => {
        const name = localStorage.getItem('Name');
        const profile = localStorage.getItem('Profile');
        const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
		const response = await API.get( `/user/name/?name=${name}&profile=${profile}`, header )
        this.setState( { 
            dataUserLogged: response.data,
            name: response.data.name,
            email: response.data.email,
            password: response.data.password,
            profile: response.data.profile,
            documentNumber: response.data.documentNumber,
            isCollaborator: false,
            bankDataId: response.data.bankData.id,
            bankAgency: response.data.bankAgency,
            bankAccount: response.data.bankAccount
        } )
    }

    changeValuesState( evt ) {
		const { name, value } = evt.target
		this.setState( {
			[name]: value
        })
    }

    edit( evt ) {
        evt.preventDefault();
		const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
        const { name, email, password, profile, documentNumber, sectorCompany, 
                isCollaborator, bankDataId, bankAgency, bankAccount } = this.state
        if ( name && email && password && documentNumber ) {
             API.put( `/user/${this.state.dataUserLogged.id}`, {
                id: this.state.dataUserLogged.id,
                name: name,
                email: email,
                password: password,
                profile: profile,
                documentNumber: documentNumber,
                isCollaborator: isCollaborator,
                bankData: {
                    id: bankDataId
                },
                bankAgency: bankAgency,
                bankAccount: bankAccount
            }, header ).then( response => {
                localStorage.removeItem('Name');
                localStorage.setItem( 'Name', name )
                toast.success(contentSuccess);
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
        const { name, email, password, documentNumber } = this.state
        return (
            <React.Fragment>
                <Container>
                    <HeaderMain title="Minha Conta" className="mb-5 mt-4"/>
                    <Row>
                        <Col lg={ 3 }>
                            <ProfileLeftNav />
                        </Col>
                        <Col lg={ 9 }>
                            <Card>
                                <CardBody>
                                    <div className="d-flex mb-4">
                                        <span className="ml-auto align-self-start small">
                                            Campos sinalizados com <span className="text-danger">*</span> são de preenchimento obrigatório.
                                        </span>
                                    </div>
                                    <Form>
                                        <FormGroup row>
                                            <Label for="name" sm={3} className="text-right">
                                                <span className="text-danger">*</span> Nome
                                            </Label>
                                            <Col sm={8}>
                                                <Input 
                                                    type="text" 
                                                    name="name" 
                                                    id="name" 
                                                    placeholder="Nome..."
                                                    defaultValue={name}
                                                    onBlur={ this.changeValuesState.bind( this ) }
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="email" sm={3} className="text-right">
                                                E-mail
                                            </Label>
                                            <Col sm={8}>
                                                <Input 
                                                    type="text" 
                                                    name="email" 
                                                    id="email" 
                                                    placeholder="E-mail..." 
                                                    defaultValue={email}
                                                    onBlur={ this.changeValuesState.bind( this ) }
                                                    readOnly
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="password" sm={3} className="text-right">
                                                <span className="text-danger">*</span> Senha
                                            </Label>
                                            <Col sm={8}>
                                                <Input type="password" name="password" id="password" placeholder="Senha..." defaultValue={password}
                                                       onBlur={ this.changeValuesState.bind( this ) } />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="repeatPassword" sm={3} className="text-right">
                                                <span className="text-danger">*</span> Repetir Senha
                                            </Label>
                                            <Col sm={8}>
                                                <Input type="password" name="password" id="repeatPassword" placeholder="Password..." defaultValue={password}
                                                       onBlur={ this.changeValuesState.bind( this ) } />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="profileSelector" sm={3} className="text-right">
                                                Perfil
                                            </Label>
                                            <Col sm={8}>
                                                <CustomInput type="select" name="profileSelector" id="profileSelector">
                                                    <option value="EXTERNAL" selected>Externo</option>
                                                </CustomInput>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="documentNumber" sm={3} className="text-right">
                                                <span className="text-danger">*</span> CPF
                                            </Label>
                                            <Col sm={8}>
                                                <Input
                                                    mask={ [/\d/, /\d/,  /\d/, '.', /\d/,  /\d/, /\d/, '.',  /\d/, /\d/, /\d/, '-', /\d/, /\d/] }
                                                    keepCharPositions={ true }
                                                    // pipe="000.000.000-00"
                                                    placeholder='Informe seu CPF...'
                                                    tag={ MaskedInput }
                                                    name="documentNumber"
                                                    id="documentNumber"
                                                    defaultValue={documentNumber}
                                                    onBlur={ this.changeValuesState.bind( this ) }
                                                />
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                </CardBody>
                                <CardFooter className="p-4 bt-0">
                                    <div className="d-flex">
                                        <Button color='primary' className="ml-auto px-4" onClick={ this.edit.bind( this ) }>Alterar</Button>
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
}
