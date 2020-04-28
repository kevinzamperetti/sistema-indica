import React, { Component } from 'react';
import MaskedInput from 'react-text-mask';
import Toggle from 'react-toggle';

import { 
    Button,
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardFooter,
    Form, 
    FormGroup, 
    Label, 
    Input
} from '../../../components';

import { HeaderDemo } from "../../components/HeaderDemo";

//import { AdvancedTableA } from '../../Tables/ExtendedTable/components'
import { CampaignList } from './CampaignList/CampaignList'

export default class Campaign extends Component {
    constructor( props ) {
        super( props )
        this.state = {
			name: '',
            expirationDate: '',
            enabled: ''
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
                                // no={1} 
                                title="Cadastro de Campanhas de Indicação" 
                                subTitle={(
                                    <React.Fragment>
                                        Visualize e cadastre campanhas de indicação.
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
                            <CampaignList />
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}