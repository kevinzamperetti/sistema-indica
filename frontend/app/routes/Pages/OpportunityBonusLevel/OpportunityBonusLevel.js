import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
// import DatePicker, { setDefaultLocale } from 'react-datepicker';
import MaskedInput from 'react-text-mask';
import Toggle from 'react-toggle';
import { createNumberMask } from 'text-mask-addons';
import { HeaderDemo } from "../../components/HeaderDemo";
import { 
    Button, ButtonGroup, Container, Row, Col, Card, CardBody, CardFooter,
    Form, FormGroup, Label, Media, Input, InputGroup, InputGroupAddon, Table
} from '../../../components';
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
                Nível de Indicação cadastrado com sucesso!
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
        this.state = {
			name: '',
			bonusValue: '',
            enabled: false,
            listOpportunityBonusLevel: []
        }
    }

    componentWillMount() {
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
        const { name, bonusValue, enabled } = this.state
		if ( name && bonusValue ) {
			API.post( '/opportunityBonusLevel', {
                name: name,
                value: bonusValue.replace('.', ''),
                enabled: enabled
			} ).then( response => {
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
    
    render() {
        const { listOpportunityBonusLevel } = this.state
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
                            {/* <CampaignList /> */}
                            <Table className="mb-0" bordered responsive>
                                <thead>
                                    <tr>
                                        <th colSpan="4" className="align-middle">Campanhas de Indicação cadastradas</th>
                                    </tr>
                                </thead>
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Valor</th>
                                        <th>Situação</th>
                                        <th colSpan="2" className="align-center">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { listOpportunityBonusLevel.length > 0 ?
                                        <React.Fragment>
                                            { listOpportunityBonusLevel.map( function( opportunityBonusLevel ) { 
                                                return (
                                                    <tr key={opportunityBonusLevel.id}>
                                                        <td className="align-self-center" width='100%'>
                                                            <span className="text-inverse"> { opportunityBonusLevel.name } </span>
                                                        </td>
                                                        <td className="align-middle" width='100%'>
                                                            <span className="text-inverse"> { opportunityBonusLevel.value } </span>
                                                        </td>
                                                        <td className="align-middle" width='100%'>
                                                            <span className="text-inverse"> { opportunityBonusLevel.enabled === true ? 'Ativo' : 'Inativo' } </span>
                                                        </td>
                                                        <td className="align-middle text-right">
                                                            <ButtonGroup>
                                                                <Button color="link" className="text-decoration-none">
                                                                    <i className="fa fa-edit"></i>
                                                                </Button>
                                                                <Button color="link" className="text-decoration-none">
                                                                    <i className="fa fa-close"></i>
                                                                </Button>
                                                            </ButtonGroup>
                                                        </td>
                                                    </tr>
                                                    ) } 
                                                )
                                            }
                                        </React.Fragment>
                                        :
                                            <tr>
                                                <td>
                                                    <span className="text-inverse">
                                                        Não existem dados para serem listados
                                                    </span>
                                                </td>
                                            </tr>
                                    }
                                </tbody>
                            </Table>
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