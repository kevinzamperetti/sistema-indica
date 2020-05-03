import React, { Component } from 'react';
// import DatePicker, { setDefaultLocale } from 'react-datepicker';
import MaskedInput from 'react-text-mask';

import {
    createNumberMask,
    emailMask
} from 'text-mask-addons';

import { 
    Button,
    Container,
    Row,
    Col,
    Card,
    CardTitle,
    CardBody,
    CardFooter,
    FormFeedback,
    Badge,
    CustomInput,
    Form, 
    FormGroup, 
    Label, 
    Input, 
    InputGroup,
    InputGroupAddon,
    FormText
} from '../../../components';

import { HeaderDemo } from "../../components/HeaderDemo";

//import { AdvancedTableA } from '../../Tables/ExtendedTable/components'
//import { CampaignList } from './CampaignList/CampaignList'

const realMaskDecimal = createNumberMask({ prefix: 'R$', allowDecimal: true, thousandsSeparatorSymbol: ".", decimalSymbol : "," });

export default class Indication extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            userId: '',
            opportunityIdSelector: '',
            listOpportunities: '',
            attachment: '',
            indicationName: '',
            indicationPhoneNumber: '',
            indicationEmail: '',
            userDocumentNumber: '',
            status: 'NEW'
		}
    }

    changeValuesStateOpportunity( evt ) {
		let { listOpportunities } = this.state
		let { name } = evt.target
		const itemID = evt.target.value
		const res = listOpportunities.find( p => p.id == itemID )
		this.setState( { 
            [name] : res
		} )
    }
    
    render() {
        const { listOpportunities } = this.state
        return (
            <React.Fragment>
                <Container>
                    <Row> 
                        <Col lg={ 12 }>
                            <HeaderDemo 
                                no=''
                                title="Realizar indicação" 
                                subTitle="Aqui é possível realizar a indicação de pessoas conhecidas em alguma de nossas oportunidades em aberto."
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={ 12 }>
                            <Card className="mb-3">
                                <CardBody>
                                    <Form>
                                        <CardTitle tag="h6" className="mt-5 mb-4">
                                            Informações do usuário que está realizando a indicação:
                                        </CardTitle>
                                        <FormGroup row>
                                            <Label for="input" sm={3}>Nome</Label>
                                            <Col sm={9}>
                                                <Input type="text" name="name" id="name" placeholder=""/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="input" sm={3}>CPF</Label>
                                            <Col sm={9}>
                                                <Input
                                                    mask={ [/\d/, /\d/,  /\d/, '.', /\d/,  /\d/, /\d/, '.',  /\d/, /\d/, /\d/, '-', /\d/, /\d/] }
                                                    keepCharPositions={ true }
                                                    // pipe="000.000.000-00"
                                                    placeholder='Informe seu CPF...'
                                                    tag={ MaskedInput }
                                                    name="documentNumber"
                                                    id="documentNumber"/>
                                            </Col>                                                
                                        </FormGroup>
                                        <CardTitle tag="h6" className="mt-5 mb-4">
                                            Informações de quem deseja indicar:
                                        </CardTitle>
                                        <FormGroup row>
                                            <Label for="CampaignIdSelector" sm={3}>Oportunidade</Label>
                                            <Col sm={9}>
                                                <CustomInput type="select" name="opportunityIdSelector" id="opportunityIdSelector" onChange={ this.changeValuesStateOpportunity.bind( this ) } >
                                                    <option value="" selected>Selecione...</option>
                                                    { listOpportunities.length > 0 ?
                                                        <React.Fragment>
                                                            { listOpportunities.map( ( opportunity ) => { 
                                                                return(
                                                                    <option key={opportunity.id} id={ opportunity.id } value={ opportunity.id } onChange={ this.changeValuesStateOpportunity.bind( this ) }>{ opportunity.name }</option>
                                                                )
                                                            } ) }
                                                        </React.Fragment>
                                                    :
                                                        <option value="Não existem oportunidades cadastradas">Não existem oportunidades cadastradas</option>
                                                    }
                                                </CustomInput>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="input" sm={3}>Nome</Label>
                                            <Col sm={9}>
                                                <Input type="text" name="indicationName" id="indicationName" placeholder=""/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="input" sm={3}>Telefone</Label>
                                            <Col sm={9}>
                                                <Input
                                                    mask={ ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/] }
                                                    placeholder='(51) 99000-0000'
                                                    tag={ MaskedInput }
                                                    id="indicationPhoneNumber"
                                                    name="indicationPhoneNumber"/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="input" sm={3}>E-mail</Label>
                                            <Col sm={9}>
                                                <Input
                                                    mask={ emailMask }
                                                    placeholder='nome@teste.com'
                                                    tag={ MaskedInput }
                                                    id="indicationEmail"
                                                    name="indicationEmail"/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="input" sm={3}>Currículo</Label>
                                            <Col sm={9}>
                                                <Input type="text" name="attachment" id="attachment" placeholder=""/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="attachment" sm={3}>Currículo</Label>
                                            <Col sm={9}>
                                                <CustomInput type="file" id="attachment" name="attachment" label="Selecionar arquivo" />
                                                <FormText color="muted">
                                                    Formato aceito: PDF. Tamanho máximo: 10Mb
                                                </FormText>
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                </CardBody>
                                <CardFooter className="p-4 bt-0">
                                    <div className="d-flex">
                                        <Button color='primary' onClick={() => {this._nextStep()}} className="ml-auto px-4">
                                            Indicar
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {/* <CampaignList /> */}
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}