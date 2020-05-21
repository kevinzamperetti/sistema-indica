import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Container, FloatGrid as Grid, Card, CardBody, Progress, CardHeader, Col, Row, Table, Badge } from '../../../components';
import { applyColumn } from '../../../components/FloatGrid';
import { HeaderMain } from "../../components/HeaderMain";
import classes from './External.scss';
import API from '../../../services/api';

const LAYOUT = {
    'indication': { md: 6, h: 6, maxH: 9, minW: 3 },
    'opportunity': { md: 6, h: 6 },
    // 'metric-v-target-users': { h: 6, md: 4 },
    // 'metric-v-target-sessions': { h: 6, md: 4 },
    // 'metric-v-target-pageviews': { h: 6, md: 4 },
    // 'analytics-audience-metrics': { h: 9, minH: 7 },
    // 'traffic-channels': { md: 6, h: 6 },
    // 'website-performance': { md: 6, h: 11 },
    // 'organic-traffic': { md: 6, h: 10 }
}

const SessionByDevice = (props) => (
    <div className={classes['session']}>
        <div className={classes['session__title']}>
            { props.title }
        </div>
        <div className={classes['session__values']}>
            <div className={`${classes['session__percentage']} text-${props.color}`}>
                { props.valuePercent }%
            </div>
            <div className={`${classes['session__value']} text-${props.color}`}>
                { props.value }
            </div>
        </div>
    </div>
);
SessionByDevice.propTypes = {
    title: PropTypes.node,
    color: PropTypes.string,
    valuePercent: PropTypes.string,
    value: PropTypes.string
}

export class External extends React.Component {
    constructor( props ) {
        super( props )
        this.state = {
            layouts: _.clone(LAYOUT),
            qtyOpportunitiesEnabled: '',
            qtyOpportunitiesDisabled: '',
            qtyIndicationsInProgressByUser: '',
            qtyIndicationsHiredByUser: '',
            qtyIndicationsDiscardedByUser: ''
        }    
    }

    componentDidMount() {
        this.listTotalOpportunities();
        this.listTotalIndicationsByUser();
    }
    
    _resetLayout = () => {
        this.setState({
            layouts: _.clone(LAYOUT)
        })
    }
    
    listTotalOpportunities = async () => {
        const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
        const response = await API.get( '/opportunity/countByStatus', header )
		this.setState( { 
            qtyOpportunitiesEnabled: response.data.qtyOpportunitiesEnabled,
            qtyOpportunitiesDisabled: response.data.qtyOpportunitiesDisabled
        }  )
    }

    listTotalIndicationsByUser = async () => {
        const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
        const userEmail = localStorage.getItem('Email')
        const response = await API.get( `/indication/countByUser?userEmail=${userEmail}`, header )
		this.setState( { 
            qtyIndicationsInProgressByUser: response.data.qtyIndicationsInProgressByUser,
            qtyIndicationsHiredByUser: response.data.qtyIndicationsHiredByUser,
            qtyIndicationsDiscardedByUser: response.data.qtyIndicationsDiscardedByUser
        }  )
    }

    render() {
        const { layouts, qtyOpportunitiesEnabled, qtyOpportunitiesDisabled, qtyIndicationsInProgressByUser,
                qtyIndicationsHiredByUser, qtyIndicationsDiscardedByUser } = this.state;

        return (
            <React.Fragment>
                <Container fluid={ false }>
                    <div className="d-flex mt-3 mb-5">
                        <HeaderMain 
                            title="Gráficos"
                            className="mt-0"
                        />
                    </div>
                    <Row className="mb-5">
                        <Col lg={ 3 }>
                            <div className="hr-text hr-text-left my-2">
                                <span>Oportunidades</span>
                            </div>
                            <Table size="sm">
                                <tbody>
                                    <tr>
                                        <td className="text-inverse bt-0">Abertas</td>
                                        <td className="text-right bt-0">
                                            <Badge color="success" pill>{qtyOpportunitiesEnabled}</Badge>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-inverse">Finalizadas</td>
                                        <td className="text-right">
                                            <Badge color="secondary" pill>{qtyOpportunitiesDisabled}</Badge>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
                <Grid>
                    <Grid.Row
                        onLayoutChange={ layouts => this.setState({ layouts }) }
                        columnSizes={ this.state.layouts }
                        rowHeight={ 55 }>
                        
                        <Grid.Col { ...(applyColumn('indication', layouts)) }>
                            <Card>
                                <CardHeader className="bb-0 pt-3 pb-0 bg-none" tag="h5">
                                    Indicações realizadas por você
                                </CardHeader>
                                <CardBody className="d-flex flex-column">
                                    <div className={classes['sessions']}>
                                        <SessionByDevice 
                                            title="Em andamento"
                                            color="primary"
                                            valuePercent={qtyIndicationsInProgressByUser}
                                            value={qtyIndicationsInProgressByUser}
                                        />
                                        <SessionByDevice 
                                            title="Contratadas"
                                            color="success"
                                            valuePercent={qtyIndicationsHiredByUser}
                                            value={qtyIndicationsHiredByUser}
                                        />
                                        <SessionByDevice 
                                            title="Descartadas"
                                            color="red"
                                            valuePercent={qtyIndicationsDiscardedByUser}
                                            value={qtyIndicationsDiscardedByUser}
                                        />
                                    </div>
                                    <Progress multi className={ classes['sessions-progress'] } style={{height: "5px"}}>
                                        <Progress bar color="primary" value={qtyIndicationsInProgressByUser} style={{height: "5px"}} />
                                        <Progress bar color="success" value={qtyIndicationsHiredByUser} style={{height: "5px"}} />
                                        <Progress bar color="red" value={qtyIndicationsDiscardedByUser} style={{height: "5px"}} />
                                    </Progress>
                                </CardBody>
                            </Card>
                        </Grid.Col>
                    </Grid.Row>
                </Grid>
            </React.Fragment>
        );
    }
}
