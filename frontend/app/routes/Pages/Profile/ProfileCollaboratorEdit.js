import React, { Component } from 'react';
import MaskedInput from 'react-text-mask';
import { ToastContainer, toast } from 'react-toastify';
import { Container, Row, Col, Input, Card, Button, CardBody, CardFooter, 
         FormText, CardTitle, CustomInput, Label, FormGroup, Media, Form } from '../../../components';
import { HeaderMain } from "../../components/HeaderMain";
import { ProfileLeftNav } from "../../components/Profile/ProfileLeftNav";
import { ProfileHeader } from "../../components/Profile/ProfileHeader";

import Util from '../../../components/Util/Util';
import API from '../../../services/api';

export default class ProfileCollaboratorEdit extends Component {
    constructor( props ) {
        super( props )
        this.util = new Util();
        this.state = {
            name: '',
            email: '',
            password: '',
            repeatPassword: '',
            profileSelector: 'COLLABORATOR',
            profile: '',
            documentNumber: '',
            sectorCompany: '',
            isCollaborator: '',
            bankDataId: '',
            bankAgency: '',
            bankAccount: '',
            disableButton: false
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
            sectorCompany: response.data.sectorCompany,
            isCollaborator: response.data.isCollaborator,
            bankDataId: response.data.bankData.id,
            bankAgency: response.data.bankAgency,
            bankAccount: response.data.bankAccount
        } )
    }

    changeValuesState( evt ) {
        const { name, value } = evt.target
        const { password, repeatPassword } = this.state
		this.setState( {
			[name]: value
        })
        if ([name] == "repeatPassword" ) {
            if ( password != repeatPassword && repeatPassword != '') {
                toast.error(this.util.contentError('Senhas informadas são diferentes!'));
                this.setState( {
                    disableButton: true
                })
            } else {
                this.setState( {
                    disableButton: false
                })
            }
        }
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
                sectorCompany: sectorCompany,
                isCollaborator: isCollaborator,
                bankData: {
                    id: bankDataId
                },
                bankAgency: bankAgency,
                bankAccount: bankAccount
            }, header ).then( response => {
                localStorage.removeItem('Name');
                localStorage.setItem( 'Name', name )
                toast.success(this.util.contentSuccess());
            } )
            .catch( error => {
                toast.error(this.util.contentError(error.response.data.message));
            } )
        } else {
            toast.error(this.util.errorFillFields());
        }
    }

    render() {
        const { name, email, password, documentNumber, disableButton } = this.state
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
                                                <Input type="text" name="password" id="password" placeholder="Senha..." defaultValue={password}
                                                       onBlur={ this.changeValuesState.bind( this ) } />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="repeatPassword" sm={3} className="text-right">
                                                <span className="text-danger">*</span> Repetir Senha
                                            </Label>
                                            <Col sm={8}>
                                                <Input type="text" name="repeatPassword" id="repeatPassword" placeholder="Repetir Senha..."
                                                       onBlur={ this.changeValuesState.bind( this ) } />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="profileSelector" sm={3} className="text-right">
                                                Perfil
                                            </Label>
                                            <Col sm={8}>
                                                <CustomInput type="select" name="profileSelector" id="profileSelector">
                                                    <option value="COLLABORATOR" selected>Colaborador</option>
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
                                        {disableButton
                                            ? <Button color='primary' className="ml-auto px-4" onClick={ this.edit.bind( this ) } disabled>Alterar</Button>
                                            : <Button color='primary' className="ml-auto px-4" onClick={ this.edit.bind( this ) }>Alterar</Button>
                                        } 
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
