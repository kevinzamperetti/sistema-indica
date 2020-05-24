import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import { HeaderDemo } from "../../../components/HeaderDemo";
import { Badge, Container, Row, Col } from '../../../../components';
import Util from '../../../../components/Util/Util';
import API from '../../../../services/api';
import { Link } from 'react-router-dom';

export default class IndicationCollaboratorList extends Component {
    constructor( props ) {
        super( props )
        this.util = new Util();
        this.state = {
            listIndications: '',
            dataUserLogged: ''
		}
    }

    componentDidMount() {
        this.getDataForPage();
    }

    getDataForPage = async () => {
        const name = localStorage.getItem('Name');
        const profile = localStorage.getItem('Profile');
        const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
        const responseUser = await API.get( `/user/name/?name=${name}&profile=${profile}`, header )
        const responseIndications = await API.get( `/indication/user/${responseUser.data.id}`, header )
        this.setState( { 
            dataUserLogged: responseUser.data,
            listIndications: responseIndications.data
        }  )
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
                              <Link className="fa fa-search" to={`/collaborator/indication/${indication.id}`} />
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
                                subTitle="Acompanhe o andamento de suas indicações aqui."
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