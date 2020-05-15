import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Container, FloatGrid as Grid, Card, CardBody, Progress, CardHeader } from '../../../components';
import { applyColumn } from '../../../components/FloatGrid';
import { HeaderMain } from "../../components/HeaderMain";
import classes from './External.scss';

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
    state = {
        layouts: _.clone(LAYOUT)
    }

    _resetLayout = () => {
        this.setState({
            layouts: _.clone(LAYOUT)
        })
    }

    render() {
        const { layouts } = this.state;

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
                        {/* Oportunidades */}
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
                                            valuePercent="50"
                                            value="50"
                                        />
                                        <SessionByDevice 
                                            title="Em andamento"
                                            color="primary"
                                            valuePercent="25"
                                            value="25"
                                        />
                                        <SessionByDevice 
                                            title="Finalizados"
                                            color="success"
                                            valuePercent="25"
                                            value="25"
                                        />
                                    </div>
                                    <Progress multi className={ classes['sessions-progress'] } style={{height: "5px"}}>
                                        <Progress bar color="red" value="50" style={{height: "5px"}} />
                                        <Progress bar color="primary" value="25" style={{height: "5px"}} />
                                        <Progress bar color="success" value="25" style={{height: "5px"}} />
                                    </Progress>
                                </CardBody>
                            </Card>
                        </Grid.Col> 
                        {/* Indicações */}
                        <Grid.Col { ...(applyColumn('indication', layouts)) }>
                            <Card>
                                <CardHeader className="bb-0 pt-3 pb-0 bg-none" tag="h6">
                                    <i className="fa fa-ellipsis-v text-body mr-2"></i> Indicações realizadas por você
                                </CardHeader>
                                <CardBody className="d-flex flex-column">
                                    <div className={classes['sessions']}>
                                        <SessionByDevice 
                                            title="Abertas"
                                            color="red"
                                            valuePercent="50"
                                            value="50"
                                        />
                                        <SessionByDevice 
                                            title="Em andamento"
                                            color="primary"
                                            valuePercent="25"
                                            value="25"
                                        />
                                        <SessionByDevice 
                                            title="Finalizados"
                                            color="success"
                                            valuePercent="25"
                                            value="25"
                                        />
                                    </div>
                                    <Progress multi className={ classes['sessions-progress'] } style={{height: "5px"}}>
                                        <Progress bar color="red" value="50" style={{height: "5px"}} />
                                        <Progress bar color="primary" value="25" style={{height: "5px"}} />
                                        <Progress bar color="success" value="25" style={{height: "5px"}} />
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
