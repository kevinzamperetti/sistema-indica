import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import { HeaderDemo } from "../../../components/HeaderDemo";
import { Badge, Container, Row, Col } from '../../../../components';
import Util from '../../../../components/Util/Util';
import API from '../../../../services/api';
import { Link } from 'react-router-dom';

export default class CandidatureExternalList extends Component {
    constructor( props ) {
        super( props )
        this.util = new Util();
        this.state = {
            dataUserLogged: '',
            listCandidaturies: ''
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
        
        const responseCandidaturies = await API.get( `/candidature/user/${responseUser.data.id}`, header )
        this.setState( { 
            dataUserLogged: responseUser.data,
            listCandidaturies: responseCandidaturies.data
         } )
    }


    render() {
        const { listCandidaturies, dataUserLogged } = this.state
        const columns = ["Oportunidade", "Candidato", "Situação", ""];
        const data = listCandidaturies.length > 0
                        ? listCandidaturies.map( ( candidature ) =>
                            [ candidature.opportunity.name, candidature.user.name,
                              <Badge pill color={this.util.setCandidatureStatusColor(candidature.status)}>
                                  {this.util.setCandidatureStatusName(candidature.status)}
                              </Badge>,
                              <Link className="fa fa-search" to={`/external/candidature/${candidature.id}`} />
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
                                title="Candidaturas" 
                                subTitle="Acompanhe o andamento de sua candidatura aqui."
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