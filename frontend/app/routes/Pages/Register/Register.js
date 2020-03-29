import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import { Redirect } from 'react-router';

import {
    Form,
    FormGroup,
    FormText,
    Input,
    CustomInput,
    Button,
    Label,
    EmptyLayout,
	ThemeConsumer,
	UncontrolledModal,
	ModalBody,
	ModalHeader,
    ModalFooter
} from './../../../components';

import { HeaderAuth } from "../../components/Pages/HeaderAuth";
import { FooterAuth } from "../../components/Pages/FooterAuth";

import API from '../../../services/api';

// const Register = () => (
export default class Register extends Component {
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

	// onChange(e) {
	// 	this.setState({
	// 	value: e.target.value
	// 	})
	// }

	register( evt ) {
		evt.preventDefault();
		const { name, email, password, profileSelector, documentNumber, bankNumberSelector, bankAgency, bankAccount } = this.state
		// let cor, mensagem
		// if ( nome && email && senha && tipoUsuario ) {
			API.post( '/user/register', {
				name: name,
				email: email,
				password: password,
				profile: profileSelector.toUpperCase(),
				documentNumber: documentNumber,
				bankNumber: bankNumberSelector,
				bankAgency: bankAgency,
				bankAccount: bankAccount
			} ).then( response => {
				console.log( response.data )
				this.setState({redirect: true})
				// this.props.history.push( "/pages/login" )
				// this.salvarImagem(response.data.id, imagem)
			//this.props.history.push( "/login" )
			})
			.catch( erro => console.log( "Erro: " + erro ) )
		// } else {
		// 	cor = 'vermelho'
		// 	mensagem = MensagemFlashConst.ERRO.PREENCHER_TODOS_CAMPOS
		// 	this.exibirMensagem( { cor, mensagem } )
		// }
	}
    
    render() {
		if(this.state.redirect) {
			return (
				<Fragment>
					<Redirect to="/pages/login/" />
				</Fragment>
			)
		} else {
			return (
				<EmptyLayout>
					<EmptyLayout.Section center width={ 480 }>
						{ /* START Header */}
						<HeaderAuth title="Criar Conta"/>
						{ /* END Header */}
						{ /* START Form */}
						<Form className="mb-3" onChange={ this.changeValuesState.bind( this ) } onSubmit={ this.register.bind( this ) } >
							<FormGroup>
								<Label for="name">Número da Conta</Label>
								<Input type="text" name="name" id="name" placeholder="Nome..." className="bg-white" />
							</FormGroup>
							<FormGroup>
								<Label for="emailAdress">E-mail</Label>
								<Input type="text" name="email" id="emailAdress" placeholder="Informe seu e-mail..." className="bg-white" />
								<FormText color="muted">
									Nós nunca compartilharemos seu email com mais ninguém.
								</FormText>
							</FormGroup>
							<FormGroup>
								<Label for="password">Password</Label>
								<Input type="password" name="password" id="password" placeholder="Senha..." className="bg-white" />
							</FormGroup>
							<FormGroup>
								<Label for="repeatPassword">Repeat Password</Label>
								<Input type="password" name="password" id="repeatPassword" placeholder="Password..." className="bg-white" />
							</FormGroup>
							<FormGroup>
								<Label for="profileSelector">Perfil</Label>
								<CustomInput 
									type="select" 
									name="profileSelector" 
									id="profileSelector"
								>
									<option value="">Selecione seu perfil...</option>
									<option value="ADMINISTRATOR">Administrador</option>
									<option value="COLLABORATOR">Colaborador</option>
								</CustomInput>
							</FormGroup>
							<FormGroup>
								<Label for="documentNumber">CPF</Label>
								<Input
									mask={ [/\d/, /\d/,  /\d/, '.', /\d/,  /\d/, /\d/, '.',  /\d/, /\d/, /\d/, '-', /\d/, /\d/] }
									keepCharPositions={ true }
									// pipe="000.000.000-00"
									placeholder='Informe seu CPF...'
									tag={ MaskedInput }
									name="documentNumber"
									id="documentNumber"
								/>
							</FormGroup>
							<FormGroup>
								<Label for="bankNumberSelector">Banco</Label>
								<CustomInput 
									type="select" 
									name="bankNumberSelector" 
									id="bankNumberSelector"
								>
									<option value="">Selecione seu banco...</option>
									<option value="001">001 - Banco do Brasil</option>
									<option value="002">002 - Banco Teste</option>
								</CustomInput>
							</FormGroup>
							<FormGroup>
								<Label for="bankAgency">Número da Agência</Label>
								<Input type="number" name="bankAgency" id="bankAgency" placeholder="Número da Agência..." className="bg-white" />
							</FormGroup>
							<FormGroup>
								<Label for="bankAccount">Número da Conta <span className="small ml-1 text-muted">(com dígito)</span></Label>
								<Input type="number" name="bankAccount" id="bankAccount" placeholder="Número da Conta..." className="bg-white" />
							</FormGroup>
							{/* <FormGroup>
								<CustomInput type="checkbox" id="acceptTerms" label="Accept Terms and Privacy Policy" inline />
							</FormGroup> */}
							<ThemeConsumer>
							{
								({ color }) => (
									<Button color={ color } block >Criar Conta</Button>
								)
							}
							</ThemeConsumer>
						</Form>
						{ /* END Form */}
						{ /* START Bottom Links */}
						<div className="d-flex mb-5">
							<Link to="/pages/forgot-password" className="text-decoration-none">Esqueceu sua senha?</Link>
							<Link to="/pages/login" className="ml-auto text-decoration-none">Login</Link>
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
}

// export default Register;