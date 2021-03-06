import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { HeaderDemo } from "../../components/HeaderDemo";
import { 
    Badge, Button, ButtonGroup, Container, Row, Col, Card, CardBody, CardFooter, CustomInput,
    Form, FormGroup, Label, Media, Input, Table
} from '../../../components';
import Util from '../../../components/Util/Util';
import API from '../../../services/api';

export default class KeyWord extends Component {
    constructor( props ) {
        super( props )
        this.util = new Util();
        this.state = {
            word: '',
			opportunityIdSelector: '',
            listOpportunities: '',
            listKeyWords: '',
            found: false
		}
    }

    componentDidMount() {
        this.listAllOpportunities();
    }

    listAllOpportunities = async () => {
		const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
		const response = await API.get( '/opportunity?enabled=true', header )
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
        const { word, opportunityIdSelector, found } = this.state
        if ( word && opportunityIdSelector ) {
             API.post( '/keyWord', {
                word: word.toUpperCase(),
                opportunity: {
                    id: opportunityIdSelector.id,
                },
                found: found
            }, header ).then( response => {
                toast.success(this.util.contentSuccess());
                document.getElementById("word").value='';
                this.listKeyWordsByOpportunity();
                this.setState( {
                    word: ''
                } )
            } )
            .catch( error => {
                toast.error(this.util.contentError(error.response.data.message));
            } )
        } else {
            toast.error(this.util.errorFillFields());
        }
    }

    delete( evt, k ) {
        // evt.preventDefault();
        const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
        API.delete( `/keyWord/${evt.id}`, header )
        .then( response => {
        toast.success(this.util.contentSuccess());
        this.listKeyWordsByOpportunity();
        } )
        .catch( error => {
            toast.error(this.util.contentError(error.response.data.message));
        } )
    }
    
    render() {
        const { listOpportunities, listKeyWords, opportunityIdSelector } = this.state
        const columns = ["Palavras chaves cadastradas para esta oportunidade", ""];
        const data = listKeyWords.length > 0
                        ? listKeyWords.map( ( keyWord ) => 
                            [ keyWord.word,
                              <Link className="fa fa-close" onClick={ this.delete.bind( this, keyWord ) }/>
                            ] )
                        : []
        const options = this.util.optionsMUIDataTableWithOutPrintAndFilter

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
                                    <Form id="form-key-word">
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
                            <MUIDataTable
                                title={
                                    listKeyWords == ''
                                     ? <b> Quantidade de palavras necessárias para avaliação automática:</b>
                                     : listKeyWords.length >= opportunityIdSelector.automaticEvaluationQuantity
                                        ? <b className="text-success"> Quantidade de palavras necessárias para avaliação automática: {opportunityIdSelector.automaticEvaluationQuantity} </b>
                                        : <b className="text-danger"> Quantidade de palavras necessárias para avaliação automática: {opportunityIdSelector.automaticEvaluationQuantity} </b>
                                      }
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