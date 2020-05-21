import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Container, FloatGrid as Grid, Card, CardBody, Progress, CardHeader, Badge, Col, Table, Row } from '../../../components';
import { applyColumn } from '../../../components/FloatGrid';
import { HeaderMain } from "../../components/HeaderMain";
import classes from './Administrator.scss';
import API from '../../../services/api';

import {
    TinyDonutChart
} from "../../components/ProjectsDashboards/TinyDonutChart"
//} from "../../../components/ProjectsDashboards/TinyDonutChart"

const LAYOUT = {
    'candidature': { md: 6, h: 6 },
    'opportunity': { md: 6, h: 6, maxH: 9, minW: 3 },
    'indication': { md: 6, h: 6 },
    // 'metric-v-target-users': { h: 6, md: 4 },
    // 'metric-v-target-sessions': { h: 6, md: 4 },
    // 'metric-v-target-pageviews': { h: 6, md: 4 },
    // 'analytics-audience-metrics': { h: 9, minH: 7 },
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

export class Administrator extends React.Component {
    constructor( props ) {
        super( props )
        this.state = {
            layouts: _.clone(LAYOUT),
            qtyIndicationsNew: '',
            qtyIndicationsInProgress: '',
            qtyIndicationsDiscarded: '',
            qtyIndicationsHired: '',
            qtyCandidaturiesNew: '',
            qtyCandidaturiesInProgress: '',
            qtyCandidaturiesDiscarded: '',
            qtyCandidaturiesHired: '',
            qtyOpportunitiesEnabled: '',
            qtyOpportunitiesDisabled: ''
        }
    }

    componentDidMount() {
        this.listTotalIndications();
        this.listTotalCandidaturies();
        this.listTotalOpportunities();
	}	

    _resetLayout = () => {
        this.setState({
            layouts: _.clone(LAYOUT)
        })
    }

	listTotalIndications = async () => {
        const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
        const response = await API.get( '/indication/countByStatus', header )
		this.setState( { 
            qtyIndicationsNew: response.data.qtyIndicationsNew,
            qtyIndicationsInProgress: response.data.qtyIndicationsInProgress,
            qtyIndicationsDiscarded: response.data.qtyIndicationsDiscarded,
            qtyIndicationsHired: response.data.qtyIndicationsHired,
        }  )
    }

    listTotalCandidaturies = async () => {
        const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
        const response = await API.get( '/candidature/countByStatus', header )
		this.setState( { 
            qtyCandidaturiesNew: response.data.qtyCandidaturiesNew,
            qtyCandidaturiesInProgress: response.data.qtyCandidaturiesInProgress,
            qtyCandidaturiesDiscarded: response.data.qtyCandidaturiesDiscarded,
            qtyCandidaturiesHired: response.data.qtyCandidaturiesHired
        }  )
    }

    listTotalOpportunities = async () => {
        const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
        const response = await API.get( '/opportunity/countByStatus', header )
		this.setState( { 
            qtyOpportunitiesEnabled: response.data.qtyOpportunitiesEnabled,
            qtyOpportunitiesDisabled: response.data.qtyOpportunitiesDisabled
        }  )
    }

    render() {
        const { layouts, qtyIndicationsNew, qtyIndicationsInProgress, qtyIndicationsDiscarded, qtyIndicationsHired,
                qtyCandidaturiesNew, qtyCandidaturiesInProgress, qtyCandidaturiesDiscarded, qtyCandidaturiesHired,
                qtyOpportunitiesEnabled, qtyOpportunitiesDisabled } = this.state;
        return (
            <React.Fragment>
                <Container fluid={ false }>
                    <div className="d-flex mt-3 mb-5">
                        <HeaderMain 
                            title="Gráficos"
                            className="mt-0"
                        />
                    </div>
                </Container>

                <Grid>
                    <Grid.Row
                        onLayoutChange={ layouts => this.setState({ layouts }) }
                        columnSizes={ this.state.layouts }
                        rowHeight={ 55 }>
                        <Grid.Col { ...(applyColumn('opportunity', layouts)) }>
                            <Card>
                                <CardHeader className="bb-0 pt-3 pb-0 bg-none" tag="h5">
                                    Oportunidades
                                </CardHeader>
                                <CardBody className="d-flex flex-column">
                                    <div className={classes['sessions']}>
                                        <SessionByDevice 
                                            title="Abertas"
                                            color="red"
                                            valuePercent={qtyOpportunitiesEnabled}
                                            value={qtyOpportunitiesEnabled}
                                        />
                                        <SessionByDevice 
                                            title="Finalizadas"
                                            color="success"
                                            valuePercent={qtyOpportunitiesDisabled}
                                            value={qtyOpportunitiesDisabled}
                                        />
                                    </div>
                                    <Progress multi className={ classes['sessions-progress'] } style={{height: "5px"}}>
                                        <Progress bar color="red" value={qtyOpportunitiesEnabled} style={{height: "5px"}} />
                                        <Progress bar color="success" value={qtyOpportunitiesDisabled} style={{height: "5px"}} />
                                    </Progress>
                                </CardBody>
                            </Card>
                        </Grid.Col>
                        
                        <Grid.Col { ...(applyColumn('indication', layouts)) }>
                            <Card>
                                <CardHeader className="bb-0 pt-3 pb-0 bg-none" tag="h5">
                                    Indicações
                                </CardHeader>
                                <CardBody className="d-flex flex-column">
                                    <div className={classes['sessions']}>
                                        <SessionByDevice 
                                            title="Abertas"
                                            color="red"
                                            valuePercent={qtyIndicationsNew}
                                            value={qtyIndicationsNew}
                                        />
                                        <SessionByDevice 
                                            title="Em andamento"
                                            color="primary"
                                            valuePercent={qtyIndicationsInProgress}
                                            value={qtyIndicationsInProgress}
                                        />
                                        <SessionByDevice 
                                            title="Contratadas"
                                            color="success"
                                            valuePercent={qtyIndicationsHired}
                                            value={qtyIndicationsHired}
                                        />
                                        <SessionByDevice 
                                            title="Descartadas"
                                            color="purple"
                                            valuePercent={qtyIndicationsDiscarded}
                                            value={qtyIndicationsDiscarded}
                                        />
                                    </div>
                                    <Progress multi className={ classes['sessions-progress'] } style={{height: "5px"}}>
                                        <Progress bar color="red" value={qtyIndicationsNew} style={{height: "5px"}} />
                                        <Progress bar color="primary" value={qtyIndicationsInProgress} style={{height: "5px"}} />
                                        <Progress bar color="success" value={qtyIndicationsHired} style={{height: "5px"}} />
                                        <Progress bar color="purple" value={qtyIndicationsDiscarded} style={{height: "5px"}} />
                                    </Progress>
                                </CardBody>
                            </Card>
                        </Grid.Col>
                        
                        <Grid.Col { ...(applyColumn('candidature', layouts)) }>
                            <Card>
                                <CardHeader className="bb-0 pt-3 pb-0 bg-none" tag="h5">
                                    Candidaturas
                                </CardHeader>
                                <CardBody className="d-flex flex-column">
                                    <div className={classes['sessions']}>
                                    <SessionByDevice 
                                            title="Abertas"
                                            color="red"
                                            valuePercent={qtyCandidaturiesNew}
                                            value={qtyCandidaturiesNew}
                                        />
                                        <SessionByDevice 
                                            title="Em andamento"
                                            color="primary"
                                            valuePercent={qtyCandidaturiesInProgress}
                                            value={qtyCandidaturiesInProgress}
                                        />
                                        <SessionByDevice 
                                            title="Contratadas"
                                            color="success"
                                            valuePercent={qtyCandidaturiesHired}
                                            value={qtyCandidaturiesHired}
                                        />
                                        <SessionByDevice 
                                            title="Descartadas"
                                            color="purple"
                                            valuePercent={qtyCandidaturiesDiscarded}
                                            value={qtyCandidaturiesDiscarded}
                                        />
                                    </div>
                                    <Progress multi className={ classes['sessions-progress'] } style={{height: "5px"}}>
                                        <Progress bar color="red" value={qtyCandidaturiesNew} style={{height: "5px"}} />
                                        <Progress bar color="primary" value={qtyCandidaturiesInProgress} style={{height: "5px"}} />
                                        <Progress bar color="success" value={qtyCandidaturiesHired} style={{height: "5px"}} />
                                        <Progress bar color="purple" value={qtyCandidaturiesDiscarded} style={{height: "5px"}} />
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
