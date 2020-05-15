import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Container, FloatGrid as Grid, Card, CardBody, Progress, CardHeader } from '../../../components';
import { applyColumn } from '../../../components/FloatGrid';
import { HeaderMain } from "../../components/HeaderMain";
import classes from './Administrator.scss';
import API from '../../../services/api';

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
    state = {
        layouts: _.clone(LAYOUT),
        qtyIndicationsNew: '',
        qtyIndicationsInProgress: '',
        qtyIndicationsFinihsed: '',
        qtyIndicationsHired: '',
        qtyCandidaturiesNew: '',
        qtyCandidaturiesInProgress: '',
        qtyCandidaturiesFinihsed: '',
        qtyCandidaturiesHired: ''
    }

    componentDidMount() {
        this.listTotalIndications();
        this.listTotalCandidaturies();
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
            qtyIndicationsFinihsed: response.data.qtyIndicationsFinihsed,
            qtyIndicationsHired: response.data.qtyIndicationsHired,
        }  )
    }

    listTotalCandidaturies = async () => {
        const header = { headers: {Authorization: localStorage.getItem('Authorization') } }
        const response = await API.get( '/candidature/countByStatus', header )
		this.setState( { 
            qtyCandidaturiesNew: response.data.qtyCandidaturiesNew,
            qtyCandidaturiesInProgress: response.data.qtyCandidaturiesInProgress,
            qtyCandidaturiesFinihsed: response.data.qtyCandidaturiesFinihsed,
            qtyCandidaturiesHired: response.data.qtyCandidaturiesHired
        }  )
    }

    render() {
        const { layouts, qtyIndicationsNew, qtyIndicationsInProgress, qtyIndicationsFinihsed, qtyIndicationsHired,
                qtyCandidaturiesNew, qtyCandidaturiesInProgress, qtyCandidaturiesFinihsed, qtyCandidaturiesHired } = this.state;
        
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
                    {/* Oportunidades */}
                    <Grid.Row
                        onLayoutChange={ layouts => this.setState({ layouts }) }
                        columnSizes={ this.state.layouts }
                        rowHeight={ 55 }>
                        <Grid.Col { ...(applyColumn('opportunity', layouts)) }>
                            <Card>
                                <CardHeader className="bb-0 pt-3 pb-0 bg-none" tag="h6">
                                    <i className="fa fa-ellipsis-v text-body mr-2"></i> Oportunidades
                                </CardHeader>
                                <CardBody className="d-flex flex-column">
                                    <div className={classes['sessions']}>
                                    <SessionByDevice 
                                            title="Abertos"
                                            color="red"
                                            valuePercent="40"
                                            value="40"
                                        />
                                        <SessionByDevice 
                                            title="Finalizadas"
                                            color="success"
                                            valuePercent="60"
                                            value="60"
                                        />
                                    </div>
                                    <Progress multi className={ classes['sessions-progress'] } style={{height: "5px"}}>
                                        <Progress bar color="red" value="50" style={{height: "5px"}} />
                                        <Progress bar color="success" value="25" style={{height: "5px"}} />
                                    </Progress>
                                </CardBody>
                            </Card>
                        </Grid.Col>
                        {/* Indicações */}
                        <Grid.Col { ...(applyColumn('indication', layouts)) }>
                            <Card>
                                <CardHeader className="bb-0 pt-3 pb-0 bg-none" tag="h6">
                                    <i className="fa fa-ellipsis-v text-body mr-2"></i> Indicações
                                </CardHeader>
                                <CardBody className="d-flex flex-column">
                                    <div className={classes['sessions']}>
                                        <SessionByDevice 
                                            title="Abertos"
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
                                            title="Finalizados"
                                            color="purple"
                                            valuePercent={qtyIndicationsFinihsed}
                                            value={qtyIndicationsFinihsed}
                                        />
                                    </div>
                                    <Progress multi className={ classes['sessions-progress'] } style={{height: "5px"}}>
                                        <Progress bar color="red" value="50" style={{height: "5px"}} />
                                        <Progress bar color="primary" value="25" style={{height: "5px"}} />
                                        <Progress bar color="success" value="25" style={{height: "5px"}} />
                                        <Progress bar color="purple" value="25" style={{height: "5px"}} />
                                    </Progress>
                                </CardBody>
                            </Card>
                        </Grid.Col>
                        {/* Candidaturas */}
                        <Grid.Col { ...(applyColumn('candidature', layouts)) }>
                            <Card>
                                <CardHeader className="bb-0 pt-3 pb-0 bg-none" tag="h6">
                                    <i className="fa fa-ellipsis-v text-body mr-2"></i> Candidaturas
                                </CardHeader>
                                <CardBody className="d-flex flex-column">
                                    <div className={classes['sessions']}>
                                    <SessionByDevice 
                                            title="Abertos"
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
                                            title="Finalizados"
                                            color="purple"
                                            valuePercent={qtyCandidaturiesFinihsed}
                                            value={qtyCandidaturiesFinihsed}
                                        />
                                    </div>
                                    <Progress multi className={ classes['sessions-progress'] } style={{height: "5px"}}>
                                        <Progress bar color="red" value="50" style={{height: "5px"}} />
                                        <Progress bar color="primary" value="25" style={{height: "5px"}} />
                                        <Progress bar color="success" value="25" style={{height: "5px"}} />
                                        <Progress bar color="purple" value="25" style={{height: "5px"}} />
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
