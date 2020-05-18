import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
// import DatePicker, { setDefaultLocale } from 'react-datepicker';
import MaskedInput from 'react-text-mask';
import Toggle from 'react-toggle';
import { createNumberMask } from 'text-mask-addons';
import { HeaderDemo } from "../../components/HeaderDemo";
import { 
    Badge, Button, ButtonGroup, Container, Row, Col, Card, CardBody, CardFooter,
    Form, FormGroup, Label, Media, Input, InputGroup, InputGroupAddon, Table
} from '../../../components';
import Util from '../../../components/Util/Util';
import API from '../../../services/api';

// const realMaskDecimal = createNumberMask({ prefix: 'R$', allowDecimal: true, thousandsSeparatorSymbol: ".", decimalSymbol : "," });
const realMaskDecimal = createNumberMask({ prefix: '', allowDecimal: false, thousandsSeparatorSymbol: "." });

// ========== Toast Contents: ============
// eslint-disable-next-line react/prop-types
const contentSuccess = ({ closeToast }) => (
    <Media>
        <Media middle left className="mr-3">
            <i className="fa fa-fw fa-2x fa-check"></i>
        </Media>
        <Media body>
            <Media heading tag="h6">
                Successo!
            </Media>
            <p>
                {/* Nível de Indicação cadastrado com sucesso! 
                    porque ta valendo pro save e delete*/}
            </p>
        </Media>
    </Media>
);

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
                Erro ao salvar dados
            </p>
        </Media>
    </Media>
);

// eslint-disable-next-line react/prop-types
const errorFillFields = ({ closeToast }) => (
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

export default class OpportunityBonusLevel extends Component {
    constructor( props ) {
        super( props )
        this.util = new Util();
        this.state = {
			name: '',
			bonusValue: '',
            enabled: false,
            listOpportunityBonusLevel: []
        }
    }

    componentDidMount() {
        this.listAllOpportunityBonusLevel();
    }

    changeValuesState( evt ) {
		const { name, value } = evt.target
		// this.validarEmail( evt )
		this.setState( {
			[name]: value
        })
    }

    listAllOpportunityBonusLevel = async () => {
		const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
		const response = await API.get( '/opportunityBonusLevel', header )
        this.setState( { listOpportunityBonusLevel: response.data }  )
    }

    save( evt ) {
		evt.preventDefault();
        const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
        const { name, bonusValue, enabled } = this.state
		if ( name && bonusValue ) {
			API.post( '/opportunityBonusLevel', {
                name: name,
                value: bonusValue.replace('.', ''),
                enabled: enabled
			}, header ).then( response => {
                toast.success(contentSuccess);
                this.listAllOpportunityBonusLevel();
				// console.log( response.data )
			} )
			.catch( erro => {
                console.log( "Erro: " + erro ) 
                toast.error(contentError);
            } )
        } else {
            toast.error(errorFillFields);
        }
    }
    
    delete( evt, o ) {
        const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
        API.delete( `/opportunityBonusLevel/${evt.id}`, header )
        .then( response => {
        toast.success(contentSuccess);
        this.listAllOpportunityBonusLevel();
        } )
        .catch( erro => {
            console.log( "Erro: " + erro ) 
            toast.error(contentError);
        } )
    }
    
    render() {
        const { listOpportunityBonusLevel } = this.state
        const columns = ["Nome", "Valor", "Situação", ""];
        const data = listOpportunityBonusLevel.length > 0
                        ? listOpportunityBonusLevel.map( ( opportunityBonusLevel ) => 
                            [ opportunityBonusLevel.name,
                              opportunityBonusLevel.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}),
                              <Badge pill color={this.util.setEnabledColor(opportunityBonusLevel.enabled)}>
                                {this.util.setEnabledName(opportunityBonusLevel.enabled)}
                              </Badge>,
                              <Link className="fa fa-close" onClick={ this.delete.bind( this, opportunityBonusLevel ) }/>
                            ] )
                        : []
        const options = this.util.optionsMUIDataTable;
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
                                        <Button color='primary' className="ml-auto px-4" onClick={ this.save.bind( this ) }>Cadastrar</Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <MUIDataTable
                                title={""}
                                data={data}
                                columns={columns}
                                options={options}/>
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