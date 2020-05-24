import React, { Component, Fragment } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Form, FormGroup, FormText, Input, Button, Label, EmptyLayout, ThemeConsumer } from './../../../components';
import { HeaderAuth } from "../../components/Pages/HeaderAuth";
import { FooterAuth } from "../../components/Pages/FooterAuth";
import { Redirect } from 'react-router';

import Util from '../../../components/Util/Util';
import API from '../../../services/api';

export default class ForgotPassword extends Component {
    constructor( props ) {
        super( props )
		this.util = new Util();
        this.state = {
			email: '',
			redirect: false
		}
    }

	changeValuesState( evt ) {
		const { name, value } = evt.target
		this.setState( {
			[name]: value
		})
    }
    
    sendTemporaryPassword = async () => {
        const emailUser = this. state.email
        if ( emailUser ) {
            const response = await API.get( `/user/forgotPassword?email=${emailUser}` )
            .then( response => {
                //toast.success(this.util.contentSuccess());
                this.setState({redirect: true})
            } )
            .catch( error => {
                toast.error(this.util.contentError(error.response.data.message));
            } )
		this.setState( { listBanks: response.data }  )
        } else {
            toast.error(this.util.errorFillFields());
        }
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
                <React.Fragment>
                    <EmptyLayout>
                        <EmptyLayout.Section center>
                            <HeaderAuth title="Esqueceu sua senha"/>
                            <Form className="mb-3">
                                <FormGroup>
                                    <Label for="emailAdress">
                                        E-mail cadastrado na plataforma
                                    </Label>
                                    <Input type="email" name="email" id="emailAdress" placeholder="E-mail..." className="bg-white"
                                           onChange={ this.changeValuesState.bind( this ) } />
                                    <FormText color="muted">
                                        Nós nunca compartilharemos seu email com mais ninguém.
                                    </FormText>
                                </FormGroup>
                                <div className="d-flex">
                                    <ThemeConsumer>
                                        {
                                            ({ color }) => (
                                                // <Button color={ color } block >Enviar senha temporária</Button>
                                                <Button color='primary'className="ml-auto px-4" block
                                                        onClick={ this.sendTemporaryPassword.bind( this ) }>Enviar senha temporária</Button>
                                            )
                                        }
                                    </ThemeConsumer>
                                </div>
                            </Form>
                            <div className="d-flex mb-5">
                                <Link to="/pages/login" className="text-decoration-none">
                                    Login
                                </Link>
                                <Link to="/pages/register" className="ml-auto text-decoration-none">
                                    Não possui cadastro?
                                </Link>
                            </div>
                            <FooterAuth />
                        </EmptyLayout.Section>
                    </EmptyLayout>
                    <ToastContainer 
                    position='top-right'
                    autoClose={3000}
                    draggable={false}
                    hideProgressBar={true}
                    />
                </React.Fragment>
            )
        }
    }  
}