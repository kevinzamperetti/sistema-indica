import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import {
    Form,
    FormGroup,
    FormText,
    Input,
    CustomInput,
    Button,
    Label,
	Media,    
    EmptyLayout,
    ThemeConsumer
} from './../../../components';

import { HeaderAuth } from "../../components/Pages/HeaderAuth";
import { FooterAuth } from "../../components/Pages/FooterAuth";

import API from '../../../services/api';

// ========== Toast Contents: ============
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
                {/* {this.state.errorMessage} */}
            </p>
        </Media>
    </Media>
);

// eslint-disable-next-line react/prop-types
const contentErrorFillFields = ({ closeToast }) => (
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

export default class Login extends Component {
    constructor( props ) {
        super( props )
        this.state = {
			name: '',
			email: '',
			password: '',
            isCollaboratorSelector: '',
            errorMessage: ''
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
        const { email, password, isCollaboratorSelector, errorMessage } = this.state
        if ( email  && password ) {
            API.post( 'http://localhost:8080/login', {
                    email: email,
					password: password,
					isCollaborator: isCollaboratorSelector
            } ).then ( response => {
                localStorage.setItem( 'Authorization' , response.data.token )
                localStorage.setItem( 'Email', response.data.email )
                localStorage.setItem( 'Name', response.data.name )
                localStorage.setItem( 'Profile', response.data.profile )
                localStorage.setItem( 'SectorCompany', response.data.sectorCompany )
                // localStorage.setItem('UserId', userId ) implementar no back se quiser gravar só o id do user no localStorage
                this.props.history.push('/home/graphics')
                } )
            .catch( error => {
                // this.setState( {
                //     errorMessage: error.response.data.message
                // } )
                // console.log( "Erro: " + error.response.data.message ) 
                console.log( "errorMessage: " + error ) 
                toast.error(contentError);
            } )
        } else {
			toast.error(contentErrorFillFields);
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
							<Label for="isCollaboratorSelector">Colaborador da empresa?</Label>
							<CustomInput type="select" name="isCollaboratorSelector" id="isCollaboratorSelector">
								<option value="">Selecione...</option>
								<option value="true">Sim</option>
								<option value="false">Não</option>
							</CustomInput>
						</FormGroup>
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
                <ToastContainer 
                    position='top-right'
                    autoClose={3000}
                    draggable={false}
                    hideProgressBar={true}
                    />
            </EmptyLayout>
        )
    }
}
    
// export default Login;
