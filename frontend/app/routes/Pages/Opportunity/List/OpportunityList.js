import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import moment from 'moment';
import { HeaderDemo } from "../../../components/HeaderDemo";
import { Badge, Container, Row, Col } from '../../../../components';
import Util from '../../../../components/Util/Util';
import API from '../../../../services/api';
import { Link } from 'react-router-dom';

export default class OpportunityList extends Component {
    constructor( props ) {
        super( props )
        this.util = new Util();
        this.state = {
            listAllOpportunities: '',
		}
    }

    componentDidMount() {
        this.listAllOpportunities();
    }

    listAllOpportunities = async () => {
		const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
        const response = await API.get( '/opportunity', header )
        this.setState( { listAllOpportunities: response.data }  )
    }

    render() {
        const { listAllOpportunities } = this.state
        const columns = ["Oportunidade", "Campanha", "Nivel de Bonificação", "Data de Expiração", "Situação", ""];
        const data = listAllOpportunities.length > 0
                        ? listAllOpportunities.map( ( opportunity ) =>
                            [ opportunity.name, opportunity.campaign.name, opportunity.bonusLevel.name,
                              moment( opportunity.expirationDate, "YYYY-MM-DD" , true).format('DD/MM/YYYY'),
                              <Badge pill color={this.util.setEnabledColor(opportunity.enabled)}>
                                  {this.util.setEnabledName(opportunity.enabled)}
                              </Badge>,
                              <Link className="fa fa-search" to={`/administrator/opportunity/${opportunity.id}`} />
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
                                title="Oportunidades" 
                                subTitle="Listagem de oportunidades existentes."
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={ 12 }>
                            <MUIDataTable
                                title={""}
                                data={data}
                                columns={columns}
                                options={options}/>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}