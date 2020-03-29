import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
    Form,
    FormGroup,
    FormText,
    Input,
    CustomInput,
    Button,
    Label,
    EmptyLayout,
    ThemeConsumer
} from './../../../components';

import { HeaderAuth } from "../../components/Pages/HeaderAuth";
import { FooterAuth } from "../../components/Pages/FooterAuth";

import API from '../../../services/api';

export default class Login extends Component {
    constructor( props ) {
        super( props )
        this.state = {
			name: '',
			email: '',
			password: '',
			profileSelector: '',
			documentNumber: '',
			bankNumberSelector: '',
			bankAgency: '',
			bankAccount: ''
		}
	}
	
	changeValuesState( evt ) {
		const { name, value } = evt.target
		// this.validarEmail( evt )
		this.setState( {
			[name]: value
		})
    }
    
    login( evt ) {
        evt.preventDefault();
        const { email, password } = this.state
        if ( email  && password ) {
            API.post( 'http://localhost:8080/login', {
                    email:   this.state.email,
                    password : this.state.password
            } ).then ( response => {
                console.log( "response: " + response.data.token );
                localStorage.setItem( 'Authorization' , response.data.token ) 
                // localStorage.setItem('Email', email )
                this.props.history.push('/dashboards/analytics')   
                } )
                // .catch( erro ) 
        }
    }

    render() {
        return(
            <EmptyLayout>
                <EmptyLayout.Section center>
                    { /* START Header */}
                    <HeaderAuth title="Login"/>
                    { /* END Header */}
                    { /* START Form */}
                    <Form className="mb-3" onChange={ this.changeValuesState.bind( this ) } onSubmit={ this.login.bind( this ) }>
                        <FormGroup>
                            <Label for="emailAdress">E-mail</Label>
                            <Input type="email" name="email" id="emailAdress" placeholder="Informar e-mail..." className="bg-white" />
                            <FormText color="muted">Nós nunca compartilharemos seu email com mais ninguém.</FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Senha</Label>
                            <Input type="password" name="password" id="password" placeholder="Senha..." className="bg-white" />
                        </FormGroup>
                        {/* <FormGroup>
                            <CustomInput type="checkbox" id="rememberPassword" label="Remember Password" inline />
                        </FormGroup> */}
                        <ThemeConsumer>
                        {
                            ({ color }) => (
                                <Button color={ color } block >Entrar</Button>
                            )
                        }
                        </ThemeConsumer>
                    </Form>
                    { /* END Form */}
                    { /* START Bottom Links */}
                    <div className="d-flex mb-5">
                        <Link to="/pages/forgot-password" className="text-decoration-none">Esqueceu sua senha?</Link>
                        <Link to="/pages/register" className="ml-auto text-decoration-none">Não possui cadastro?</Link>
                    </div>
                    { /* END Bottom Links */}
                    { /* START Footer */}
                    <FooterAuth />
                    { /* END Footer */}
                </EmptyLayout.Section>
            </EmptyLayout>
        )
    }
}
    
// export default Login;
