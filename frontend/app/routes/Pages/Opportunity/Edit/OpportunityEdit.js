import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import MaskedInput from 'react-text-mask';
import Toggle from 'react-toggle';
import moment from 'moment';
import { HeaderDemo } from "../../../components/HeaderDemo";
import { 
    Button, Container, Row, Col, Card, CardBody, CardFooter, CustomInput, 
    Form, FormGroup, Label, Media, Input
} from '../../../../components';
import Util from '../../../../components/Util/Util';
import API from '../../../../services/api';
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

export default class OpportunityEdit extends Component {
    constructor( props ) {
        super( props )
        this.util = new Util();
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
            listOpportunityBonusLevel: '',
            opportunity: '',
            campaign: '',
            bonusLevel: ''
		}
    }

    componentDidMount() {
        this.listIndicationById();
        this.listAllCampaigns();
        this.listAllOpportunityBonusLevel();
    }	
    
    changeValuesState( evt ) {
		const { name, value } = evt.target
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

    listIndicationById = async () => {
        const { id } = this.props.match.params
		const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
        const response = await API.get( `/opportunity/${id}`, header )
        // const responseHistory = await API.get( `/indicationHistory/${response.data.id}`, header )
        // const responseKeyWord = await API.get( `/keyWord/opportunity/${response.data.opportunity.id}`, header )
        this.setState( { 
            opportunity: response.data,
            campaign: response.data.campaign,
            bonusLevel: response.data.bonusLevel,
            enabled: response.data.enabled,
            name: response.data.name,
            description: response.data.description,
            campaignIdSelector: response.data.campaign,
            opportunityBonusLevelIdSelector:response.data.bonusLevel,
            experienceLevelSelector: response.data.experienceLevel,
            expirationDate: moment( response.data.expirationDate, 'YYYY-MM-DD',true).format('DD/MM/YYYY'),
            automaticEvaluationQuantity: response.data.automaticEvaluationQuantity
         }  )
    }

    listAllCampaigns = async () => {
		const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
		const response = await API.get( '/campaign', header )
		this.setState( { listCampaign: response.data }  )
	}

    listAllOpportunityBonusLevel = async () => {
		const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
		const response = await API.get( '/opportunityBonusLevel', header )
		this.setState( { listOpportunityBonusLevel: response.data }  )
    }
    
    getListExperienceLevel(experienceLevel){
        if (experienceLevel === "JUNIOR") {
            return (
                <React.Fragment>
                    <option value="JUNIOR" selected>Junior</option>
                    <option value="PLENO">Pleno</option>
                    <option value="SENIOR">Senior</option>
                </React.Fragment>
            )
        } else if (experienceLevel === "PLENO") {
            return (
                <React.Fragment>
                    <option value="JUNIOR">Junior</option>
                    <option value="PLENO" selected>Pleno</option>
                    <option value="SENIOR">Senior</option>
                </React.Fragment>
            )
        } else if (experienceLevel === "SENIOR") {
            return (
                <React.Fragment>
                    <option value="JUNIOR">Junior</option>
                    <option value="PLENO">Pleno</option>
                    <option value="SENIOR" selected>Senior</option>
                </React.Fragment>
            )
        }
    }

    edit( evt ) {
        evt.preventDefault();
		const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
        const { name, description, campaignIdSelector, opportunityBonusLevelIdSelector, experienceLevelSelector,
                expirationDate, automaticEvaluationQuantity, enabled, opportunity } = this.state
        if ( name && description && campaignIdSelector && 
             expirationDate && automaticEvaluationQuantity ) {
 
            const expirationDateFormatted = moment( expirationDate, 'DD/MM/YYYY',true).format("YYYY-MM-DD");
            API.put( `/opportunity/${opportunity.id}`, {
                id: opportunity.id,
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
        const { opportunity, campaign, bonusLevel, listCampaign, listOpportunityBonusLevel } = this.state
        return (
            <React.Fragment>
                <Container>
                    <Row> 
                        <Col lg={ 12 }>
                            <HeaderDemo 
                                no=''
                                title={'Oportunidade ' + opportunity.name}
                                subTitle="Edite esta oportunidade."
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
                                                <Input type="text" name="name" id="name" placeholder="" 
                                                       defaultValue={opportunity.name} onBlur={ this.changeValuesState.bind( this ) }/>
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
                                                    defaultValue={opportunity.description}
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
                                                    { this.getListExperienceLevel(opportunity.experienceLevel) }
                                                </CustomInput>
                                            </Col>
                                        </FormGroup>                                        
                                        <FormGroup row>
                                            <Label for="campaignIdSelector" sm={3}>Campanha de Indicação</Label>
                                            <Col sm={9}>
                                                <CustomInput type="select" name="campaignIdSelector" id="campaignIdSelector" 
                                                             onChange={ this.changeValuesStateCampaign.bind( this ) } >
                                                    <option key={campaign.id} id={ campaign.id } value={ campaign.id } selected>{campaign.name}</option>
                                                    { listCampaign.length > 0 ?
                                                        <React.Fragment>
                                                            { listCampaign.map( ( c ) => { 
                                                                if (campaign.id != c.id) {
                                                                    return(
                                                                        <option key={c.id} id={ c.id } value={ c.id } 
                                                                                onChange={ this.changeValuesStateCampaign.bind( this ) }>{ c.name }
                                                                        </option>
                                                                    )    
                                                                }
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
                                                    <option key={bonusLevel.id} id={ bonusLevel.id } value={ bonusLevel.id } selected>{bonusLevel.name}</option>
                                                    { listOpportunityBonusLevel.length > 0 ?
                                                        <React.Fragment>
                                                            { listOpportunityBonusLevel.map( ( b ) => { 
                                                                return(
                                                                    <option key={b.id} id={ b.id } value={ b.id } 
                                                                            onChange={ this.changeValuesStateOpportunityBonusLevel.bind( this ) }>{ b.name }
                                                                    </option>
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
                                                    id="expirationDate"
                                                    name="expirationDate"
                                                    value={ moment(opportunity.expirationDate, 'YYYY-MM-DD', true).format('DD/MM/YYYY') }
                                                    // defaultValue={opportunity.expirationDate}
                                                    onBlur={ this.changeValuesState.bind( this ) }/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="input" sm={3}>
                                                Quantidade de Avaliação automática 
                                            </Label>
                                            <Col sm={9}>
                                                <Input type="number" 
                                                       name="automaticEvaluationQuantity" 
                                                       id="automaticEvaluationQuantity"
                                                       defaultValue={opportunity.automaticEvaluationQuantity}
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
                                        {/* <div className="l-flex">
                                            <Button color='secondary' className="ml-auto px-4" onClick={ this.save.bind( this ) }>Excluir</Button>
                                        </div> */}
                                        <Button color='primary' className="ml-auto px-4" onClick={ this.edit.bind( this ) }>Alterar</Button>
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
                <CardFooter className="mt-4 mb-2 p-8 bt-0">
                    <div className="d-flex">
                        <Button onClick={this.util.goPreviousPage.bind(this)} color="link" className='mr-3'>
                            <i className='fa fa-angle-left mr-2'></i>
                            Voltar
                        </Button>
                    </div>
                </CardFooter>
            </React.Fragment>
        )
    }
}