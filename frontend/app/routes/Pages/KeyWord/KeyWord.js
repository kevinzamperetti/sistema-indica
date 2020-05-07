import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { HeaderDemo } from "../../components/HeaderDemo";
import { 
    Button, ButtonGroup, Container, Row, Col, Card, CardBody, CardFooter, CustomInput,
    Form, FormGroup, Label, Media, Input, Table
} from '../../../components';

// import { BasicBehaviors, InputSize, ControllingSelections } from '../../../routes/Forms/Typeahead/components';
// import { TrTableBordered } from '../../Tables/Tables/components/TrTableBordered';

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
                {/* Palavra Chave cadastrada com sucesso! comentado 
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

export default class KeyWord extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            word: '',
			opportunityIdSelector: '',
            listOpportunities: '',
            listKeyWords: '',
            enabled: false
		}
    }

    componentWillMount() {
        this.listAllOpportunities();
    }

    listAllOpportunities = async () => {
		const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
		const response = await API.get( '/opportunity', header )
        this.setState( { listOpportunities: response.data }  )
    }

    listKeyWordsByOpportunity = async () => {
		const header = { headers: { Authorization: localStorage.getItem('Authorization') } }
        //const id = this.state.opportunityIdSelector.id ? this.state.opportunityIdSelector.id : 0;
        // const id = this.state.opportunityIdSelector ? this.state.opportunityIdSelector : 0;
        const response = await API.get( `/keyWord/opportunity/${opportunityIdSelector.value}`, header )
        this.setState( { listKeyWords: response.data } )
        // console.log('listKeyWords: ', this.state.listKeyWords)
    }    

    changeValuesState( evt ) {
		const { name, value } = evt.target
		this.setState( {
			[name]: value
        })
    }

    changeValuesStateOpportunity( evt ) {
        evt.preventDefault();
        let { listOpportunities } = this.state
		let { name } = evt.target
		const itemID = evt.target.value
		const res = listOpportunities.find( p => p.id == itemID )
		this.setState( { 
            [name] : res
        } )
        // console.log('res')
        // console.log(res.id)
        // this.setState( { 
        //     idOpportunitySelected: res.value
        //     // opportunityIdSelector: {
        //     //     id: res.is
        //     // }
        // } )
        this.listKeyWordsByOpportunity();
        // console.log('opportunityIdSelector: ', opportunityIdSelector.value)
        // console.log('id listKeyWordsByOpportunity:', this.state.opportunityIdSelector.id)
        // console.log('value listKeyWordsByOpportunity:', this.state.opportunityIdSelector.value)        
    }

    save( evt ) {
        evt.preventDefault();
        const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
        const { word, opportunityIdSelector, enabled } = this.state
        if ( word && opportunityIdSelector ) {
             API.post( '/keyWord', {
                word: word.toUpperCase(),
                opportunity: {
                    id: opportunityIdSelector.id,
                },
                enabled: enabled
            }, header ).then( response => {
                toast.success(contentSuccess);
                this.listKeyWordsByOpportunity();
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

    delete( evt, k ) {
        // evt.preventDefault();
        const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
        API.delete( `/keyWord/${evt.id}`, header )
        .then( response => {
        toast.success(contentSuccess);
        this.listKeyWordsByOpportunity();
        } )
        .catch( erro => {
            console.log( "Erro: " + erro ) 
            toast.error(contentError);
        } )
    }
    
    render() {
        const { listOpportunities, listKeyWords } = this.state
        return (
            <React.Fragment>
                <Container>
                    <Row> 
                        <Col lg={ 12 }>
                            <HeaderDemo 
                                no=''
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
                                                <CustomInput type="select" name="opportunityIdSelector" id="opportunityIdSelector" 
                                                             onChange={ this.changeValuesStateOpportunity.bind( this ) } >
                                                    <option value="" selected>Selecione...</option>
                                                        { listOpportunities.length > 0 ?
                                                            <React.Fragment>
                                                                { listOpportunities.map( ( opportunity ) => { 
                                                                    return(
                                                                        <option key={opportunity.id} id={ opportunity.id } value={ opportunity.id } 
                                                                                onClick={ this.changeValuesStateOpportunity.bind( this ) }>{ opportunity.name }
                                                                        </option>
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
                                                <Input type="text" name="word" id="word" placeholder="" className="text-uppercase mr-1"
                                                       onBlur={ this.changeValuesState.bind( this ) }/>
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
                            <Table className="mb-0" bordered responsive>
                                <thead>
                                    <tr>
                                        <th colSpan="2" className="align-middle">Palavras chaves cadastradas para esta oportunidade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { listKeyWords.length > 0 ?
                                        <React.Fragment>
                                            { listKeyWords.map( ( keyWord ) => { 
                                                return (
                                                    <tr key={keyWord.id}>
                                                        <td className="align-middle" width='100%'>
                                                                        <span className="text-inverse">
                                                                            { keyWord.word }
                                                                        </span>
                                                        </td>
                                                        <td className="align-middle text-right">
                                                            <ButtonGroup>
                                                                {/* <Button color="link" className="text-decoration-none">
                                                                    <i className="fa fa-edit"></i>
                                                                </Button> */}
                                                                <Button color="link" className="text-decoration-none" onClick={ this.delete.bind( this, keyWord ) }>
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
                                                        Não existem palavras chaves cadastradas para esta oportunidade
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