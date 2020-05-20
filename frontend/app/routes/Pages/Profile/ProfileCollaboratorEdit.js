import React, { Component } from 'react';
import MaskedInput from 'react-text-mask';
import { Container, Row, Col, Input, Card, Button, CardBody, CardFooter, 
         FormText, CardTitle, CustomInput, Label, FormGroup, Form } from '../../../components';
import { HeaderMain } from "../../components/HeaderMain";
import { ProfileLeftNav } from "../../components/Profile/ProfileLeftNav";
import { ProfileHeader } from "../../components/Profile/ProfileHeader";

import API from '../../../services/api';

export default class ProfileCollaboratorEdit extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            name: '',
            email: '',
            password: '',
            profileSelector: 'COLLABORATOR',
            documentNumber: '',
            bankIdSelector: '',
            bankAgency: '',
            bankAccount: '',
            listBanks: []
        }
    }

    render() {
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
                                                    name="" 
                                                    id="name" 
                                                    placeholder="Nome..."
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
                                                    name="text" 
                                                    id="email" 
                                                    placeholder="Last Name..." 
                                                    readOnly
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="password" sm={3} className="text-right">
                                                <span className="text-danger">*</span> Senha
                                            </Label>
                                            <Col sm={8}>
                                                <Input type="password" name="password" id="password" placeholder="Senha..." />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="repeatPassword" sm={3} className="text-right">
                                                <span className="text-danger">*</span> Repetir Senha
                                            </Label>
                                            <Col sm={8}>
                                                <Input type="password" name="password" id="repeatPassword" placeholder="Password..." />
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
                                                />
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                </CardBody>
                                <CardFooter className="p-4 bt-0">
                                    <div className="d-flex">
                                        <Button color='primary' className="ml-auto px-4">Alterar</Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}
