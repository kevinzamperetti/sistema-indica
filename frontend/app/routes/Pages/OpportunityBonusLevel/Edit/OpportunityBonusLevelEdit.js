import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
// import DatePicker, { setDefaultLocale } from 'react-datepicker';
import MaskedInput from 'react-text-mask';
import Toggle from 'react-toggle';
import { createNumberMask } from 'text-mask-addons';
import { HeaderDemo } from "../../components/HeaderDemo";
import { 
    Button, Container, Row, Col, Card, CardBody, CardFooter,
    Form, FormGroup, Label, Media, Input, InputGroup,InputGroupAddon
} from '../../../components';
import API from '../../../services/api';
import Util from '../../../../components/Util/Util';

// const realMaskDecimal = createNumberMask({ prefix: 'R$', allowDecimal: true, thousandsSeparatorSymbol: ".", decimalSymbol : "," });
const realMaskDecimal = createNumberMask({ prefix: '', allowDecimal: false, thousandsSeparatorSymbol: "." });

export default class OpportunityBonusLevelEdit extends Component {
    constructor( props ) {
        super( props )
        this.util = new Util();
        this.state = {
			name: '',
			bonusValue: '',
			enabled: false
        }
        {console.log(this.state.enabled)}
    }

    changeValuesState( evt ) {
		const { name, value } = evt.target
		// this.validarEmail( evt )
		this.setState( {
			[name]: value
        })
        console.log(value)
    }

    save( evt ) {
		evt.preventDefault();
        const { name, bonusValue, enabled } = this.state
		if ( name && bonusValue ) {
			API.post( '/opportunityBonusLevel', {
                name: name,
                enabled: enabled,
                value: bonusValue.replace('.', '')
			} ).then( response => {
                toast.success(this.util.contentSuccess());
				console.log( response.data )
                // { <Redirect to="/pages/opportunity-bonus-level" /> }
			} )
			.catch( error => {
                toast.error(this.util.contentError(error.response.data.message));
            } )
        } else {
            toast.error(this.util.errorFillFields());
        }
	}    
    
    render() {
        return (
            <React.Fragment>
                <Container>
                    <Row> 
                        <Col lg={ 12 }>
                            <HeaderDemo 
                                no=''
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
                                                <Input type="text" name="name" id="name" placeholder="" onBlur={ this.changeValuesState.bind( this ) }/>
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
                                                    <Input 
                                                        mask={ realMaskDecimal } 
                                                        className='text-right form-control' 
                                                        tag={ MaskedInput }
                                                        placeholder="Informe o valor da bonificação..." 
                                                        id="bonusValue" 
                                                        name="bonusValue"
                                                        onBlur={ this.changeValuesState.bind( this ) } />
                                                    <InputGroupAddon addonType="append">,00</InputGroupAddon>
                                                </InputGroup>
                                            </Col> 
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="input" sm={3}>
                                                Ativo
                                            </Label>
                                            <Col sm={9}>
                                                {/* <Toggle
                                                    checked={ this.state.enabled }
                                                    name='enabled'
                                                    value='true'
                                                    onChange={ () => { this.setState({ enabled: !this.state.enabled }) } }/> */}
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
                                        <div className="l-flex">
                                            <Button color='secondary' className="ml-auto px-4" onClick={ this.save.bind( this ) }>Excluir</Button>
                                        </div>
                                        <Button color='primary' className="ml-auto px-4" onClick={ this.save.bind( this ) }>Salvar</Button>
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
// export default OpportunityBonusLevel;