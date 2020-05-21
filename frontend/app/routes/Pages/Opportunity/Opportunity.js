import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import MaskedInput from 'react-text-mask';
import Toggle from 'react-toggle';
import moment from 'moment';
import { HeaderDemo } from "../../components/HeaderDemo";
import { 
    Button, Container, Row, Col, Card, CardBody, CardFooter, CustomInput, 
    Form, FormGroup, Label, Media, Input
} from '../../../components';
import API from '../../../services/api';

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
                Oportunidade cadastrada com sucesso!
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

export default class Opportunity extends Component {
    constructor( props ) {
        super( props )
        this.state = {
			name: '',
			description: '',
            campaignIdSelector: '',
            opportunityBonusLevelIdSelector: '',
            experienceLevelSelector: '',
            expirationDate: '',
            automaticEvaluationQuantity: '',
            enabled: false,
            listCampaign: '',
            listOpportunityBonusLevel: ''
		}
    }

    componentDidMount() {
        this.listAllCampaigns();
        this.listAllOpportunityBonusLevel();
    }	

    listAllCampaigns = async () => {
		const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
		const response = await API.get( '/campaign?enabled=true', header )
		this.setState( { listCampaign: response.data }  )
	}

    listAllOpportunityBonusLevel = async () => {
		const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
		const response = await API.get( '/opportunityBonusLevel?enabled=true', header )
		this.setState( { listOpportunityBonusLevel: response.data }  )
	}

    changeValuesState( evt ) {
		const { name, value } = evt.target
		// this.validarEmail( evt )
		this.setState( {
			[name]: value
        })
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

    save( evt ) {
        evt.preventDefault();
        const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
        const { name, description, campaignIdSelector, opportunityBonusLevelIdSelector, experienceLevelSelector,
                expirationDate, automaticEvaluationQuantity, enabled } = this.state
        
        if ( name && description && campaignIdSelector && opportunityBonusLevelIdSelector && experienceLevelSelector &&
             expirationDate && automaticEvaluationQuantity ) {
 
            const expirationDateFormatted = moment( expirationDate, 'DD/MM/YYYY',true).format("YYYY-MM-DD");
            API.post( '/opportunity', {
                name: name,
                description: description,
                campaign: {
                    id: campaignIdSelector.id
                },
                bonusLevel:  {
                    id: opportunityBonusLevelIdSelector.id
                },
                experienceLevel: experienceLevelSelector,
                expirationDate: expirationDateFormatted,
                automaticEvaluationQuantity: automaticEvaluationQuantity,
                enabled: enabled
            }, header ).then( response => {
                toast.success(contentSuccess);
                document.getElementById("form-opportunity").reset();
        		// this.props.history.push("/pages/key-word")
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
        const { listCampaign, listOpportunityBonusLevel } = this.state
        return (
            <React.Fragment>
                <Container>
                    <Row> 
                        <Col lg={ 12 }>
                            <HeaderDemo 
                                no=''
                                title="Cadastro de Oportunidades" 
                                subTitle="Cadastre Oportunidades. É possível vincular as oportunidades à Campanhas de Indicação se desejar."
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={ 12 }>
                            <Card className="mb-3">
                                <CardBody>
                                    <Form id="form-opportunity">
                                        <FormGroup row>
                                            <Label for="input" sm={3}>
                                                Nome
                                            </Label>
                                            <Col sm={9}>
                                                <Input type="text" name="name" id="name" placeholder="" onBlur={ this.changeValuesState.bind( this ) }/>
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
                                                    onBlur={ this.changeValuesState.bind( this ) }
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="experienceLevelSelector" sm={3}>Nível de Experiência</Label>
                                            <Col sm={9}>
                                                <CustomInput type="select" name="experienceLevelSelector" id="experienceLevelSelector" 
                                                             onChange={ this.changeValuesState.bind( this ) }>
                                                    <option value="" selected>Selecione...</option>
                                                    <option value="JUNIOR">Junior</option>
                                                    <option value="PLENO">Pleno</option>
                                                    <option value="SENIOR">Senior</option>
                                                </CustomInput>
                                            </Col>
                                        </FormGroup>                                        
                                        <FormGroup row>
                                            <Label for="campaignIdSelector" sm={3}>Campanha de Indicação</Label>
                                            <Col sm={9}>
                                                <CustomInput type="select" name="campaignIdSelector" id="campaignIdSelector" 
                                                             onChange={ this.changeValuesStateCampaign.bind( this ) } >
                                                    <option value="" selected>Nenhuma</option>
                                                    { listCampaign.length > 0 ?
                                                        <React.Fragment>
                                                            { listCampaign.map( ( campaign ) => { 
                                                                return(
                                                                    <option key={campaign.id} id={ campaign.id } value={ campaign.id } 
                                                                            onChange={ this.changeValuesStateCampaign.bind( this ) }>{ campaign.name }</option>
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
                                            <Label for="opportunityBonusLevelIdSelector" sm={3}>Nível de Bonificação</Label>
                                            <Col sm={9}>
                                                <CustomInput type="select" name="opportunityBonusLevelIdSelector" id="opportunityBonusLevelIdSelector" 
                                                             onChange={ this.changeValuesStateOpportunityBonusLevel.bind( this ) } >
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
                                                    id="expirationDate"
                                                    onBlur={ this.changeValuesState.bind( this ) }/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="input" sm={3}>
                                                Quantidade de Avaliação automática 
                                            </Label>
                                            <Col sm={9}>
                                                <Input type="number" name="automaticEvaluationQuantity" id="automaticEvaluationQuantity" placeholder=""
                                                       onBlur={ this.changeValuesState.bind( this ) }/>
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