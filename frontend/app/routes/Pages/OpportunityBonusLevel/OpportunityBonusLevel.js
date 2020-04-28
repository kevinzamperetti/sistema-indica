import React, { Component } from 'react';
// import DatePicker, { setDefaultLocale } from 'react-datepicker';
import MaskedInput from 'react-text-mask';
import Toggle from 'react-toggle';

import {
    createNumberMask
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

import { HeaderMain } from "../../components/HeaderMain";
import { HeaderDemo } from "../../components/HeaderDemo";

//import { AdvancedTableA } from '../../Tables/ExtendedTable/components'
//import { CampaignList } from './CampaignList/CampaignList'

// const realMaskDecimal = createNumberMask({ prefix: 'R$', allowDecimal: true, thousandsSeparatorSymbol: ".", decimalSymbol : "," });
const realMaskDecimal = createNumberMask({ prefix: '', allowDecimal: false, thousandsSeparatorSymbol: "." });

export default class OpportunityBonusLevel extends Component {
    constructor( props ) {
        super( props )
        this.state = {
			name: '',
			email: '',
			password: '',
			isCollaboratorSelector: ''
		}
    }
    
    render() {
        return (
            <React.Fragment>
                <Container>
                    <Row> 
                        <Col lg={ 12 }>
                            <HeaderDemo 
                                // no={1} 
                                title="Cadastro de Níveis de Indicação" 
                                subTitle={(
                                    <React.Fragment>
                                        Visualize e cadastre níveis de bonificação. O nível de indicação deverá ser informado nas oportunidades de trabalho.
                                    </React.Fragment>
                                )}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={ 12 }>
                            <Card className="mb-3">
                                <CardBody>
                                    <Form>
                                        <FormGroup row>
                                            <Label for="input" sm={3}>
                                                Nome
                                            </Label>
                                            <Col sm={9}>
                                                <Input type="text" name="name" id="name" placeholder=""/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="input" sm={3}>
                                                Valor da Bonificação:
                                            </Label>
                                            <Col sm={9}>
                                            {/* <Input
                                                mask={ realMaskDecimal }
                                                className='text-right form-control'
                                                placeholder='Informe o valor da bonificação'
                                                tag={ MaskedInput }
                                                name="bonusValue"
                                                id="bonusValue"/> */}
                                                <InputGroup>
                                                    <InputGroupAddon addonType="prepend">R$</InputGroupAddon>
                                                    <Input mask={ realMaskDecimal } className='text-right form-control' tag={ MaskedInput }
                                                    placeholder="Informe o valor da bonificação..." id="bonusValue" name="bonusValue" />
                                                    <InputGroupAddon addonType="append">,00</InputGroupAddon>
                                                </InputGroup>
                                            </Col> 
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="input" sm={3}>
                                                Ativo
                                            </Label>
                                            <Col sm={9}>
                                                <Toggle
                                                    checked={ this.state.enabled }
                                                    name='enabled'
                                                    value='true'
                                                    onChange={ () => { this.setState({ enabled: !this.state.enabled }) } }/>
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                </CardBody>
                                <CardFooter className="p-4 bt-0">
                                    <div className="d-flex">
                                        <Button color='primary' onClick={() => {this._nextStep()}} className="ml-auto px-4">
                                            Cadastrar
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
// export default OpportunityBonusLevel;