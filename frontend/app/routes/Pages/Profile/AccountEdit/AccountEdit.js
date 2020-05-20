import React, { Component } from 'react';
import { Container, Row, Col, Input, Card, Button, CardBody, CardFooter, 
         CustomInput, CardTitle, Label, FormGroup, Form } from '../../../../components';
import { HeaderMain } from "../../../components/HeaderMain";
import { ProfileLeftNav } from "../../../components/Profile/ProfileLeftNav";
import { ProfileHeader } from "../../../components/Profile/ProfileHeader";
import API from '../../../../services/api';

export default class AccountEdit extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            bankIdSelector: '',
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
            bankAgency: response.data.bankAgency,
            bankAccount: response.data.bankAccount
        } )
    }

	listAllBanks = async () => {
		const response = await API.get( '/bankData' )
		this.setState( { listBanks: response.data }  )
    }
    
	changeValuesStateBank( evt ) {
		let { listBanks } = this.state
		let { name } = evt.target
		const itemID = evt.target.value
		const res = listBanks.find( p => p.id == itemID )
		this.setState( { 
						[name] : res
		} )
	}    
    
    render() {
        const { listBanks, bankAgency, bankAccount, bankIdSelector } = this.state
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
                                                <CustomInput type="select" name="bankIdSelector" id="bankIdSelector" onChange={ this.changeValuesStateBank.bind( this ) } >
                                                    <option value="" selected>Selecione seu banco...</option>
                                                    <option key={bankIdSelector.id} id={ bankIdSelector.id } value={ bankIdSelector.id } selected>{bankIdSelector.name}</option>
                                                    { listBanks.length > 0 ?
                                                        <React.Fragment>
                                                            { listBanks.map( ( bank ) => { 
                                                                if (bankIdSelector != bank.id) {
                                                                    return(
                                                                        <option key={bank.id} id={ bank.id } value={ bank.id } 
                                                                                onChange={ this.changeValuesStateBank.bind( this ) }>{ bank.number +"-"+ bank.name }
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
                                                    placeholder="Número da Agência..." />
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
                                                    placeholder="Número da Conta..." />
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