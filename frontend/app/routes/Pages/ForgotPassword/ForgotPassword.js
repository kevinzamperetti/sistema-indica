import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import {
    Form,
    FormGroup,
    FormText,
    Input,
    Button,
    Label,
    EmptyLayout,
    ThemeConsumer
} from './../../../components';

import { HeaderAuth } from "../../components/Pages/HeaderAuth";
import { FooterAuth } from "../../components/Pages/FooterAuth";

export default class ForgotPassword extends Component {
    constructor( props ) {
        super( props )
        this.state = {
			name: '',
			email: '',
			password: '',
			profileSelector: 'EXTERNAL',
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
                <EmptyLayout>
                    <EmptyLayout.Section center>
                        { /* START Header */}
                        <HeaderAuth title="Esqueceu sua senha"/>
                        <Form className="mb-3">
                            <FormGroup>
                                <Label for="emailAdress">
                                    E-mail cadastrado na plataforma
                                </Label>
                                <Input type="email" name="email" id="emailAdress" placeholder="Enter..." className="bg-white" />
                                <FormText color="muted">
                                    Nós nunca compartilharemos seu email com mais ninguém.
                                </FormText>
                            </FormGroup>
                            <div className="d-flex">
                                <ThemeConsumer>
                                    {
                                        ({ color }) => (
                                            <Button color={ color } block >Enviar senha temporária</Button>
                                        )
                                    }
                                </ThemeConsumer>
                            </div>
                        </Form>
                        { /* END Form */}
                        { /* START Bottom Links */}
                        <div className="d-flex mb-5">
                            <Link to="/pages/login" className="text-decoration-none">
                                Login
                            </Link>
                            <Link to="/pages/register" className="ml-auto text-decoration-none">
                                Não possui cadastro?
                            </Link>
                        </div>
                        { /* END Bottom Links */}
                        { /* START Footer */}
                        <FooterAuth />
                        { /* END Footer */}
                    </EmptyLayout.Section>
                </EmptyLayout>
            </React.Fragment>
        )
    }
}