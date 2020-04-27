import React from 'react';
// import DatePicker, { setDefaultLocale } from 'react-datepicker';
import MaskedInput from 'react-text-mask';

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

import { HeaderMain } from "../../components/HeaderMain";
import { HeaderDemo } from "../../components/HeaderDemo";

//import { AdvancedTableA } from '../../Tables/ExtendedTable/components'
import { CampaignList } from './CampaignList/CampaignList'

const Campaign = () => (
    <React.Fragment>
        <Container>
            <HeaderMain 
                title="Campanhas de Indicação"
                className="mb-5 mt-4"
            />
            { /* START Header 1 */}
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
            { /* END Header 1 */}
            { /* START Section 1 */}
            <Row>
                <Col lg={ 12 }>
                    <Card className="mb-3">
                        <CardBody>
                            { /* START Form */}
                            <Form>
                                { /* START Input */}
                                <FormGroup row>
                                    <Label for="input" sm={3}>
                                        Nome
                                    </Label>
                                    <Col sm={9}>
                                        <Input type="text" name="name" id="name" placeholder=""/>
                                    </Col>
                                </FormGroup>
                                { /* END Input */}

                                { /* START Radios */}
                                {/* <FormGroup row>
                                    <Label for="input" sm={3}>
                                        Possui premiação
                                    </Label>
                                    <Col sm={9}>
                                        <CustomInput 
                                            type="radio" 
                                            id="radioInlineCustom1"
                                            name="radioInlineCustom"
                                            label="Checked Custom" 
                                            inline
                                            defaultChecked
                                        />
                                        <CustomInput 
                                            type="radio" 
                                            id="radioInlineCustom2" 
                                            name="radioInlineCustom"
                                            label="Unchecked Custom" 
                                            inline
                                        />
                                    </Col>
                                </FormGroup> */}
                                { /* END Radios */}

                                { /* START Radios */}
                                <FormGroup row>
                                    <Label for="input" sm={3}>
                                        Ativo
                                    </Label>
                                    <Col sm={9}>
                                    <CustomInput 
                                                type="radio" 
                                                id="radioInlineCustom1"
                                                name="radioInlineCustom"
                                                label="Checked Custom" 
                                                inline
                                                defaultChecked
                                            />
                                            <CustomInput 
                                                type="radio" 
                                                id="radioInlineCustom2" 
                                                name="radioInlineCustom"
                                                label="Unchecked Custom" 
                                                inline
                                            />
                                    </Col>
                                </FormGroup>
                                { /* END Radios */}
 
                                { /* START Input */}
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
                                { /* END Input */}
                                {/* <Button color="primary" >Cadastrar</Button> */}
                            </Form>
                            { /* END Form */}
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
            { /* END Section 1 */}
        </Container>
    </React.Fragment>
);

export default Campaign;