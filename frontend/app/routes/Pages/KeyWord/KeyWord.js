import React, { Component } from 'react';

import {
    createNumberMask
} from 'text-mask-addons';

import { 
    Button,
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardFooter,
    CustomInput,
    Form, 
    FormGroup, 
    Label, 
    Input
} from '../../../components';

import { HeaderMain } from "../../components/HeaderMain";
import { HeaderDemo } from "../../components/HeaderDemo";

//import { CampaignList } from './CampaignList/CampaignList'

export default class KeyWord extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            word: '',
			opportunityIdSelector: '',
            listOpportunities: '',
            enabled: ''
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
                                // no={1} 
                                title="Cadastro de Palavras Chave" 
                                subTitle="Visualize e cadastre as palavras chaves desta oportunidade. Estas palavras serão pesquisadas nos currículos anexados para a oportunidade escolhe abaixo."
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={ 12 }>
                            <Card className="mb-3">
                                <CardBody>
                                    <Form>
                                        <FormGroup row>
                                            <Label for="opportunityIdSelector" sm={3}>Oportunidade</Label>
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
                                            <Label for="input" sm={3}>
                                                Palavra
                                            </Label>
                                            <Col sm={9}>
                                                <Input type="text" name="word" id="word" placeholder=""/>
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
                    {/* <Row>
                        <Col>
                            <CampaignList />
                        </Col>
                    </Row> */}
                </Container>
            </React.Fragment>
        )
    }
}