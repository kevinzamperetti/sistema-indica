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

export default class OpportunityBonusLevel extends Component {
    constructor( props ) {
        super( props )
        this.util = new Util();
        this.state = {
            idOpportunityBonusLevel: '',
			name: '',
			bonusValue: '',
            enabled: false,
            listOpportunityBonusLevel: [],
            edit: false
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
        const { idOpportunityBonusLevel, name, bonusValue, enabled, edit } = this.state
        const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
		if ( name && bonusValue && !edit ) {
			API.post( '/opportunityBonusLevel', {
                name: name,
                value: bonusValue.replace('.', ''),
                enabled: enabled
			}, header ).then( response => {
                toast.success(this.util.contentSuccess());
                document.getElementById("name").value='';
                document.getElementById("bonusValue").value='';
                
                this.listAllOpportunityBonusLevel();
				this.setState( {
                    name: '',
                    bonusValue: '',
                    enabled: false
                } )
			} )
			.catch( error => {
                toast.error(this.util.contentError(error.response.data.message));
            } )
        } else if ( idOpportunityBonusLevel && name && bonusValue && edit ) {
            console.log(bonusValue)
			API.put( `/opportunityBonusLevel/${idOpportunityBonusLevel}`, {
                id: idOpportunityBonusLevel,
                name: name,
                value: bonusValue.replace('.', ''),
                enabled: enabled
			}, header ).then( response => {
                toast.success(this.util.contentSuccess());
                document.getElementById("form-opportunity-bonus-level").reset();
                this.listAllOpportunityBonusLevel();
			} )
			.catch( error => {
                toast.error(this.util.contentError(error.response.data.message));
            } )
        } else {
            toast.error(this.util.errorFillFields());
        }
    }
    
    delete( evt, o ) {
        const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
        API.delete( `/opportunityBonusLevel/${evt.id}`, header )
        .then( response => {
        toast.success(this.util.contentSuccess());
        this.listAllOpportunityBonusLevel();
        } )
        .catch( error => {
            toast.error(this.util.contentError(error.response.data.message));
        } )
    }

    fillForm( opportunityBonusLevel ) {
        this.setState( { 
            idOpportunityBonusLevel: opportunityBonusLevel.id,
            name: opportunityBonusLevel.name,
            bonusValue: opportunityBonusLevel.value,
            enabled: opportunityBonusLevel.enabled,
            edit: true
         }  )
    }

    render() {
        const { listOpportunityBonusLevel, name, bonusValue } = this.state
        const columns = ["Nome", "Valor", "Situação", "", ""];
        const data = listOpportunityBonusLevel.length > 0
                        ? listOpportunityBonusLevel.map( ( opportunityBonusLevel ) => 
                            [ opportunityBonusLevel.name,
                              opportunityBonusLevel.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}),
                              <Badge pill color={this.util.setEnabledColor(opportunityBonusLevel.enabled)}>
                                {this.util.setEnabledName(opportunityBonusLevel.enabled)}
                              </Badge>,
                              <Link className="fa fa-edit" onClick={ this.fillForm.bind( this, opportunityBonusLevel ) }/>,                              
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
                                    <Form id="form-opportunity-bonus-level">
                                        <FormGroup row>
                                            <Label for="input" sm={3}>
                                                Nome
                                            </Label>
                                            <Col sm={9}>
                                                <Input type="text" name="name" id="name" placeholder="" defaultValue={name}
                                                       onBlur={ this.changeValuesState.bind( this ) }/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="input" sm={3}>
                                                Valor da Bonificação:
                                            </Label>
                                            <Col sm={9}>
                                                <InputGroup>
                                                    <InputGroupAddon addonType="prepend">R$</InputGroupAddon>
                                                    <Input 
                                                        mask={ realMaskDecimal } 
                                                        className='text-right form-control' 
                                                        tag={ MaskedInput }
                                                        placeholder="Informe o valor da bonificação..." 
                                                        id="bonusValue" 
                                                        name="bonusValue"
                                                        value={bonusValue}
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