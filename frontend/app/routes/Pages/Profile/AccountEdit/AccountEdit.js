import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Container, Row, Col, Input, Card, Button, CardBody, CardFooter, 
         CustomInput, CardTitle, Label, FormGroup, Form, Media } from '../../../../components';
import { HeaderMain } from "../../../components/HeaderMain";
import { ProfileLeftNav } from "../../../components/Profile/ProfileLeftNav";
import { ProfileHeader } from "../../../components/Profile/ProfileHeader";

import Util from '../../../../components/Util/Util';
import API from '../../../../services/api';

export default class AccountEdit extends Component {
    constructor( props ) {
        super( props )
        this.util = new Util();
        this.state = {
            bankIdSelector: '',
            bankData: '',
            bankAgency: '',
            bankAccount: '',
            listBanks: [],
            dataUserLogged: ''
        }
    }

    componentDidMount() {
		this.listAllBanks() && this.getDataUserLogged()
    }
    
    getDataUserLogged = async () => {
        const name = localStorage.getItem('Name');
        const profile = localStorage.getItem('Profile');
        const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
		const response = await API.get( `/user/name/?name=${name}&profile=${profile}`, header )
        this.setState( { 
            dataUserLogged: response.data,
            bankIdSelector: response.data.bankData,
            bankData: response.data.bankData,
            bankAgency: response.data.bankAgency,
            bankAccount: response.data.bankAccount
        } )
    }

	listAllBanks = async () => {
		const response = await API.get( '/bankData' )
		this.setState( { listBanks: response.data }  )
    }
    
	changeValuesStateBank( evt ) {
        evt.preventDefault();
        let { listBanks } = this.state
		let { name } = evt.target
		const itemID = evt.target.value
        const res = listBanks.find( p => p.id == itemID )
        console.log('res: ' + res.id)
        console.log('name: ' + [name])
		this.setState( { 
            [name] : res
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
        const { bankIdSelector, bankAgency, bankAccount } = this.state
        if ( bankAgency && bankAccount ) {
             API.put( `/user/${this.state.dataUserLogged.id}/bankData`, {
                idUser: this.state.dataUserLogged.id,   
                bankDataId: bankIdSelector.id,
                bankAgency: bankAgency,
                bankAccount: bankAccount
            }, header ).then( response => {
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
        const { listBanks, bankAgency, bankAccount, bankData } = this.state
        return (
            <React.Fragment>
                <Container>
                    <HeaderMain title="Dados Bancários" className="mb-5 mt-4"/>
                    <Row>
                        <Col lg={ 3 }>
                            <ProfileLeftNav />
                        </Col>
                        <Col lg={ 9 }>
                            <Card className="mb-3">
                                <CardBody>
                                    <div className="d-flex mb-4">
                                        <span className="ml-auto align-self-start small">
                                            Campos sinalizados com <span className="text-danger">*</span> são de preenchimento obrigatório.
                                        </span>
                                    </div>
                                    <Form>
                                        <FormGroup row>
                                            <Label for="bankIdSelector" sm={4} className="text-right">
                                                <span className="text-danger">*</span> Banco
                                            </Label>
                                            <Col sm={6}>
                                                <CustomInput type="select" name="bankIdSelector" id="bankIdSelector" onClick={ this.changeValuesStateBank.bind( this ) } >
                                                    {/* <option value="" selected>Selecione seu banco...</option> */}
                                                    <option key={bankData.id} id={ bankData.id } value={ bankData.id } selected>{bankData.name}</option>
                                                    { listBanks.length > 0 ?
                                                        <React.Fragment>
                                                            { listBanks.map( ( bank ) => { 
                                                                if (bankData.id != bank.id) {
                                                                    return(
                                                                        <option key={bank.id} id={ bank.id } value={ bank.id } 
                                                                                onBlur={ this.changeValuesStateBank.bind( this ) }>{ bank.name }
                                                                        </option>
                                                                    )
                                                                }
                                                            } ) }
                                                        </React.Fragment>
                                                    :
                                                        <option value="Não existe uma lista de bancos cadastrada">Não existe uma lista de bancos cadastrada</option>
                                                    }
                                                </CustomInput>
                                            </Col>                                                
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="bankAgency" sm={4} className="text-right">
                                                <span className="text-danger">*</span> Número da Agência
                                            </Label>
                                            <Col sm={4}>
                                                <Input
                                                    type="number"
                                                    name="bankAgency"
                                                    id="bankAgency"
                                                    defaultValue={bankAgency}
                                                    placeholder="Número da Agência..." 
                                                    onBlur={ this.changeValuesState.bind( this ) }/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="bankAccount" sm={4} className="text-right">
                                                <span className="text-danger">*</span> Número da Conta
                                                <span className="small ml-1 text-muted">(com dígito)</span>
                                            </Label>
                                            <Col sm={4}>
                                                <Input
                                                    type="text" 
                                                    name="bankAccount" 
                                                    id="bankAccount" 
                                                    defaultValue={bankAccount} 
                                                    placeholder="Número da Conta..."
                                                    onBlur={ this.changeValuesState.bind( this ) }/>
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