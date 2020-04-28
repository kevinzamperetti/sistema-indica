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
    FormText
} from '../../../components';

import { HeaderDemo } from "../../components/HeaderDemo";

//import { AdvancedTableA } from '../../Tables/ExtendedTable/components'
//import { CampaignList } from './CampaignList/CampaignList'

const realMaskDecimal = createNumberMask({ prefix: 'R$', allowDecimal: true, thousandsSeparatorSymbol: ".", decimalSymbol : "," });

export default class Opportunity extends Component {
    constructor( props ) {
        super( props )
        this.state = {
			name: '',
			description: '',
            campaign: '',
            bonusLevel: '',
            experienceLevel: '',
            expirationDate: '',
            automaticEvaluationQuantity: '',
            enabled: '',
            listCampaign: '',
            listOpportunityBonusLevel: ''
		}
    }

    changeValuesStateCampaign( evt ) {
		let { listCampaign } = this.state
		let { name } = evt.target
		const itemID = evt.target.value
		const res = listCampaign.find( p => p.id == itemID )
		this.setState( { 
            [name] : res
		} )
    }
    
    changeValuesStateOpportunityBonusLevel( evt ) {
		let { listOpportunityBonusLevel } = this.state
		let { name } = evt.target
		const itemID = evt.target.value
		const res = listOpportunityBonusLevel.find( p => p.id == itemID )
		this.setState( { 
            [name] : res
		} )
    }
    
    render() {
        const { listCampaign, listOpportunityBonusLevel } = this.state
        return (
            <React.Fragment>
                <Container>
                    <Row> 
                        <Col lg={ 12 }>
                            <HeaderDemo 
                                // no={1} 
                                title="Cadastro de Oportunidades" 
                                subTitle="Visualize e cadastre Oportunidades. É possível vincular as oportunidades à Campanhas de Indicação se desejar."
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
                                            <Label for="description" sm={3}>
                                                Descrição
                                            </Label>
                                            <Col sm={9}>
                                                <Input 
                                                    type="textarea" 
                                                    rows="10"
                                                    name="description" 
                                                    id="description" 
                                                    placeholder="Descreva os detalhes da oportunidade..." 
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="experienceLevelSelector" sm={3}>Nível de Experiência</Label>
                                            <Col sm={9}>
                                                <CustomInput type="select" name="experienceLevelSelector" id="experienceLevelSelector">
                                                    <option value="" selected>Selecione...</option>
                                                    <option value="JUNIOR">Junior</option>
                                                    <option value="PLENO">Pleno</option>
                                                    <option value="SENIOR">Senior</option>
                                                </CustomInput>
                                            </Col>
                                        </FormGroup>                                        
                                        <FormGroup row>
                                            <Label for="CampaignIdSelector" sm={3}>Campanha de Indicação</Label>
                                            <Col sm={9}>
                                                <CustomInput type="select" name="CampaignIdSelector" id="CampaignIdSelector" onChange={ this.changeValuesStateCampaign.bind( this ) } >
                                                    <option value="" selected>Nenhuma</option>
                                                    { listCampaign.length > 0 ?
                                                        <React.Fragment>
                                                            { listCampaign.map( ( campaign ) => { 
                                                                return(
                                                                    <option key={campaign.id} id={ campaign.id } value={ campaign.id } onChange={ this.changeValuesStateCampaign.bind( this ) }>{ campaign.name }</option>
                                                                )
                                                            } ) }
                                                        </React.Fragment>
                                                    :
                                                        <option value="Não existem Campanhas de Indicação cadastradas">Não existem Campanhas de Indicação cadastradas</option>
                                                    }
                                                </CustomInput>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="OpportunityBonusLevelIdSelector" sm={3}>Nível de Bonificação</Label>
                                            <Col sm={9}>
                                                <CustomInput type="select" name="OpportunityBonusLevelIdSelector" id="OpportunityBonusLevelIdSelector" onChange={ this.changeValuesStateOpportunityBonusLevel.bind( this ) } >
                                                    <option value="" selected>Nenhuma</option>
                                                    { listOpportunityBonusLevel.length > 0 ?
                                                        <React.Fragment>
                                                            { listOpportunityBonusLevel.map( ( opportunityBonusLevel ) => { 
                                                                return(
                                                                    <option key={opportunityBonusLevel.id} id={ opportunityBonusLevel.id } value={ opportunityBonusLevel.id } onChange={ this.changeValuesStateOpportunityBonusLevel.bind( this ) }>{ opportunityBonusLevel.name }</option>
                                                                )
                                                            } ) }
                                                        </React.Fragment>
                                                    :
                                                        <option value="Não existem Níveis de Bonificação cadastrados">Não existem Níveis de Bonificação cadastrados</option>
                                                    }
                                                </CustomInput>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="input" sm={3}>
                                                Data de Expiração
                                            </Label>
                                            <Col sm={9}>
                                                <Input
                                                    mask={ [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] }
                                                    placeholder='01/01/1970'
                                                    tag={ MaskedInput }
                                                    name="expirationDate"
                                                    id="expirationDate"/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="input" sm={3}>
                                                Quantidade de Avaliação automática 
                                            </Label>
                                            <Col sm={9}>
                                                <Input type="number" name="automaticEvaluationQuantity" id="automaticEvaluationQuantity" placeholder=""/>
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