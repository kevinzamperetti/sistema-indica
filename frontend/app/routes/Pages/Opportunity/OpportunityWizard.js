import React from 'react';
import MaskedInput from 'react-text-mask';
import _ from 'lodash';
import Toggle from 'react-toggle';

import {
    Button,
    Container,
    CustomInput,
    Wizard,
    Card,
    Nav,
    NavItem,
    NavLink,
    CardFooter,
    CardBody,
    Row,
    Col,
    Table,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    Label,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown
} from './../../../components';

import { HeaderMain } from "../../components/HeaderMain";
import { HeaderDemo } from "../../components/HeaderDemo";

const sequence = ['indication', 'keyWord'];

export default class OpportunityWizard extends React.Component {
    constructor( props ) {
        super( props )
        this.state = {
            currentStep: _.first(sequence),
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
        const { currentStep } = this.state;

        return (
            <Container>
                <HeaderMain 
                    title="Wizard"
                    className="my-4"
                />
                <Card>
                    <CardBody className="d-flex justify-content-center pt-5">
                        <Wizard activeStep={ currentStep } onStepChanged={ this._changeStep }>
                            <Wizard.Step id={ sequence[0] } icon={ <i className="fa fa-shopping-basket fa-fw"></i> } complete={ this._isComplete(sequence[0]) }>
                                Cadastro de Indicação
                            </Wizard.Step>
                            <Wizard.Step id={ sequence[1] } icon={ <i className="fa fa-cube fa-fw"></i> } complete={ this._isComplete(sequence[1]) }>
                                Cadastro de Palavras Chave
                            </Wizard.Step>
                        </Wizard>
                    </CardBody>

                    <CardBody className="p-5">
                    {
                        (() => {
                            switch(this.state.currentStep) {
                                case sequence[0]:
                                    return <WizardStep1 />
                                case sequence[1]:
                                    return <WizardStep2 />
                            }
                        })()
                    }
                    </CardBody>

                    <CardFooter className="p-4 bt-0">
                        <div className="d-flex">
                            {
                                currentStep !== sequence[0] && (
                                    <Button onClick={() => {this._prevStep()}} color="link" className='mr-3'>
                                        <i className='fa fa-angle-left mr-2'></i>
                                        Previous
                                    </Button>
                                )
                            }
                            {
                                currentStep !== sequence[sequence.length - 1] && (
                                    <Button color='primary' onClick={() => {this._nextStep()}} className="ml-auto px-4">
                                        Next
                                        <i className='fa fa-angle-right ml-2'></i>
                                    </Button>
                                )
                            }
                            {
                                currentStep == sequence[1] && (
                                    // <Button color='primary' onClick={() => {this._nextStep()}} className="ml-auto px-4">
                                    //     Cadastrar
                                    //     <i className='fa fa-angle-right ml-2'></i>
                                    // </Button>
                                    
                                    <Button color='primary' onClick={() => {this._nextStep()}} className="ml-auto px-4">
                                        Cadastrar
                                    </Button>
                                
                                )
                            }
                        </div>
                    </CardFooter>
                </Card>
            </Container>
        );
    }

    _changeStep = (stepId) => {
        this.setState({
            currentStep: stepId
        });
    }

    _prevStep = () => {
        const index = sequence.indexOf(this.state.currentStep);
        this.setState({
            currentStep: sequence[index - 1]
        });
    }

    _nextStep = () => {
        const index = sequence.indexOf(this.state.currentStep);
        this.setState({
            currentStep: sequence[index + 1]
        });
    }

    _isComplete = (stepId) =>
        sequence.indexOf(stepId) < sequence.indexOf(this.state.currentStep)
}

// default class WizardStep1 extends React.Component {
//         render() {
//         const { currentStep } = this.state;

//         return (
// }
const WizardStep1 = () => (
    <React.Fragment>
        <Container>
            <HeaderMain title="Oportunidades" className="mb-5 mt-4"/>
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
                                    <Label for="textArea" sm={3}>
                                        Descrição
                                    </Label>
                                    <Col sm={9}>
                                        <Input 
                                            type="textarea" 
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
                                {/* <FormGroup row>
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
                                </FormGroup> */}
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
                    </Card>
                </Col>
            </Row>
        </Container>
    </React.Fragment>
);
const WizardStep2 = () => (
    <Container>
        <HeaderMain title="Palavras Chave" className="mb-5 mt-4"/>
            <Row> 
                <Col lg={ 12 }>
                    <HeaderDemo 
                        // no={1} 
                        title="Cadastro de Palavras Chave" 
                        subTitle="Visualize e cadastre as palavras chaves desta oportunidade. Estas palavras serão pesquisadas nos currículos anexados para esta oportunidade."
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
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
    </Container>

);