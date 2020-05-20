import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import { HeaderDemo } from "../../../components/HeaderDemo";
import { Badge, Container, Row, Col } from '../../../../components';
import Util from '../../../../components/Util/Util';
import API from '../../../../services/api';
import { Link } from 'react-router-dom';

export default class IndicationList extends Component {
    constructor( props ) {
        super( props )
        this.util = new Util();
        this.state = {
            listIndications: '',
		}
    }

    componentDidMount() {
        this.getDataUserLogged() && this.listAllIndications();
    }

    getDataUserLogged = async () => {
        const name = localStorage.getItem('Name');
        const profile = localStorage.getItem('Profile');
        const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
		const response = await API.get( `/user/name/?name=${name}&profile=${profile}`, header )
        this.setState( { dataUserLogged: response.data } )
    }

    listAllIndications = async () => {
		const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
        const response = await API.get( '/indication', header )
        this.setState( { listIndications: response.data }  )
    }

    render() {
        const { listIndications, dataUserLogged } = this.state
        const columns = ["Oportunidade", "Indicado por", "Nome do Indicação", "Situação", ""];
        const data = listIndications.length > 0
                        ? listIndications.map( ( indication ) =>
                            [ indication.opportunity.name, indication.user.name, indication.indicationName, 
                              <Badge pill color={this.util.setIndicationStatusColor(indication.status)}>
                                  {this.util.setIndicationStatusName(indication.status)}
                              </Badge>,
                              <Link className="fa fa-search" to={`/administrator/indication/${indication.id}`} />
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
                                title="Indicações" 
                                subTitle="Listagem de indicações existentes para análise."
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