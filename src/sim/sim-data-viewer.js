/**
 * Created by rihdus on 13/6/17.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SimStatsView from './sim-stats';
import moment from 'moment';
import _ from 'lodash';

import { SimEvalFactory } from './sim-eval';

const SORT_STATE = {
    AESC: 0,
    DESC: 1,
    NONE: 2,
};

class SimLogView extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        filter_scenario: PropTypes.string,
        filter_carBuild: PropTypes.string,
    };

    static defaultProps = {
        filter_scenario: "",
        filter_carBuild: "",
    };

    constructor() {
        super();
        this.sceDataDict = {};
        this.utils = {
            moment: moment
        };

        this.state = {
            sortKey: null,
        };

        this.simData = [];

        this.sortKey = {
            startTime: {
                dir: SORT_STATE.NONE,
                sorter: function (sim) {
                    return new Date(sim.startTime).getTime();
                }
            },
            endTime: {
                dir: SORT_STATE.NONE,
                sorter: function (sim) {
                    return new Date(sim.endTime).getTime();
                }
            },
            scenarioId: {
                dir: SORT_STATE.NONE
            },
            carBuild: {
                dir: SORT_STATE.NONE
            },
            runTime: {
                dir: SORT_STATE.NONE,
                sorter: function (sim) {
                    return new Date(sim.endTime).getTime() - new Date(sim.startTime).getTime();
                }
            },
            numStops: {
                dir: SORT_STATE.NONE
            },
            collision: {
                dir: SORT_STATE.NONE
            },
            result: {
                dir: SORT_STATE.NONE
            }
        }
    }

    componentWillMount() {
        this.simData = this._prepSimData(this.props.data.simulationRuns);
    }

    componentDidMount() {
    }

    componentWillUpdate() {
        // console.log('updating ..', this.simData);
        this.simData = this._prepSimData(this.props.data.simulationRuns);
        if (this.state.sortKey) {
            this.simData = this._sortSimData(
                this.simData,
                this.state.sortKey,
                this.sortKey[this.state.sortKey].dir === SORT_STATE.AESC);
        }
    }

    render() {
        this.sceDataDict = this._prepData(this.props.data.scenarios);

        return (

            <div>
                <SimStatsView simData={this.simData} sceDict={this.sceDataDict}/>
                <hr/>
                <table className="table table-responsive">
                    <thead>
                    <tr>
                        <th onClick={() => this.onSortKeyClick('scenarioId')}>
                            <span>Scenario Id</span>
                            <span>{this.state.sortKey === 'scenarioId' ? this.sortKey.scenarioId.dir ? '↑' : '↓' : ''}</span>
                        </th>
                        <th onClick={() => this.onSortKeyClick('carBuild')}>
                            <span>Car Build</span>
                            <span>{this.state.sortKey === 'carBuild' ? this.sortKey.carBuild.dir ? '↑' : '↓' : ''}</span>
                        </th>
                        <th onClick={() => this.onSortKeyClick('startTime')}>
                            <span>Start Time</span>
                            <span>{this.state.sortKey === 'startTime' ? this.sortKey.startTime.dir ? '↑' : '↓' : ''}</span>
                        </th>
                        <th onClick={() => this.onSortKeyClick('runTime')}>
                            <span>Running Time / Max Running Time</span>
                            <span>{this.state.sortKey === 'runTime' ? this.sortKey.runTime.dir ? '↑' : '↓' : ''}</span>
                        </th>
                        <th onClick={() => this.onSortKeyClick('numStops')}>
                            <span>Number of Stops / Max Stops</span>
                            <span>{this.state.sortKey === 'numStops' ? this.sortKey.numStops.dir ? '↑' : '↓' : ''}</span>
                        </th>
                        <th onClick={() => this.onSortKeyClick('collision')}>
                            <span>Collision</span>
                            <span>{this.state.sortKey === 'collision' ? this.sortKey.collision.dir ? '↑' : '↓' : ''}</span>
                        </th>
                        <th onClick={() => this.onSortKeyClick('result')}>
                            <span>Result</span>
                            <span>{this.state.sortKey === 'result' ? this.sortKey.result.dir ? '↑' : '↓' : ''}</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody className="text-left">
                    {this.simData.map((sim, index) => {
                        return (
                            <tr key={'sim' + index}>
                                <td>{sim.scenarioId}</td>
                                <td>{sim.carBuild}</td>
                                <td>{sim.m_endTime.format('MM/DD/YY, hh:mm')}</td>
                                <td>
                                    <span>{Math.round(sim._runTime.asMinutes())}mins</span>
                                    <span>/</span>
                                    <span>{Math.round(this.utils.moment.duration(this.sceDataDict[sim.scenarioId].maxRunningTime).asMinutes())}mins</span>
                                </td>
                                <td>
                                    <span>{sim.result.numberOfStops}</span>
                                    <span>/</span>
                                    <span>{this.sceDataDict[sim.scenarioId].maxNumberOfStops}</span>
                                </td>
                                <td>{sim.result.hasCollision ? 'yes ✔' : 'no ✘'}</td>
                                <td>{this.sceDataDict[sim.scenarioId].sceneEvaluator.eval(sim) ? 'Pass ✔' : 'Fail ✘'}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>

            </div>
        );
    }

    onSortKeyClick(key) {
        let new_sortKey = this.sortKey[key];
        if (key === this.state.sortKey) {
            // Rotate sort dir
            switch (this.sortKey[key].dir) {
                case SORT_STATE.NONE:
                    new_sortKey.dir = SORT_STATE.AESC;
                    break;
                case SORT_STATE.AESC:
                    new_sortKey.dir = SORT_STATE.DESC;
                    break;
                case SORT_STATE.DESC:
                    new_sortKey.dir = SORT_STATE.AESC;
                    break;
            }
            this.simData = _.reverse(this.simData);
        } else {
            this.simData = this._sortSimData(
                this.simData,
                key,
                this.sortKey[key].dir === SORT_STATE.AESC);
        }

        this.setState({
            sortKey: key,
            sortDir: this.sortKey[key].dir
        });
    }

    /**
     * Format scenarios array as to dictionary.
     * @param scenarios
     * @return {{}} Object Dictionary of scenarios
     *  - key: scenarioId
     *  - value: scenario object
     * @private
     */
    _prepData(scenarios) {
        let dict = {};
        scenarios.forEach(sce => {
            dict[sce.scenarioId] = sce;
            dict[sce.scenarioId].sceneEvaluator = SimEvalFactory(sce);
        });
        return dict;
    }


    /**
     * Sort simulation data by provided key and sort direction.
     * @param simData
     * @param key
     * @param asc sort direction ascending
     * @return {*}
     * @private
     */
    _sortSimData(simData, key, asc) {
        let _this = this;
        if (key === null) {
            return simData
        }
        else {
            let newSort = _.sortBy(simData, function (sim) {
                let sortKey = _this.sortKey[key];
                if (sortKey.sorter) {
                    return sortKey.sorter(sim);
                } else
                    return sim[key];
            });
            return asc ? newSort : _.reverse(newSort);
        }
    }

    _prepSimData(simData) {
        return simData.map(sim => {
            let _sim = {
                startTime: sim.startTime,
                m_startTime: moment(sim.startTime),
                endTime: sim.endTime,
                m_endTime: moment(sim.endTime),
                scenarioId: sim.scenarioId,
                carBuild: sim.carBuild,
                result: sim.result,
            };
            _sim._runTime = moment.duration(_sim.m_endTime.diff(_sim.m_startTime));
            return _sim;
        })
    }
}

export default SimLogView;