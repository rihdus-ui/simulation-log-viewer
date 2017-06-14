/**
 * Created by rihdus on 13/6/17.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default class SimStatsView extends Component {

    static propTypes = {
        simData: PropTypes.array.isRequired,
        sceDict: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.simStats = {};
    }

    render() {
        this.simStats = this._prepViewData(this.props.simData, this.props.sceDict);
        return (
            <div>
                <div className="row">
                    <div className="col-xs-3">
                        <h2>{this.simStats.p_countExceededMaxStops !== undefined ?
                            this.simStats.p_countExceededMaxStops + '%' : 'NA'}</h2>
                        <span className="label label-primary">Exceeded Max Stops</span>
                    </div>
                    <div className="col-xs-3">
                        <h2>{this.simStats.p_countExceededRunningTime !== undefined ?
                            this.simStats.p_countExceededRunningTime+'%':'NA'}</h2>
                        <span className="label label-info">Exceeded Runtime</span>
                    </div>
                    <div className="col-xs-3">
                        <h2>{this.simStats.p_countCollisions !== undefined ?
                            this.simStats.p_countCollisions+'%':'NA'}</h2>
                        <span className="label label-success">Collisions</span>
                    </div>
                    <div className="col-xs-3">
                        <h2>{this.simStats.p_total !== undefined ?
                            this.simStats.p_total+'%':'NA'}</h2>
                        <span className="label label-danger">Total</span>
                    </div>
                </div>
            </div>
        )
    }

    /**
     * Evaluate statistics for the simulation run
     * @param simData Array List of simulation records
     * @param sceDict Object Dictionary of scenario records.
     * @return Object
     *  - p_countExceededMaxStops Percentage of sims which exceed max stops value
     *  - p_countExceededRunningTime Percentage of sims which exceed max runtime
     *  - p_countCollisions Percentage of sims which have collisions
     *  - p_total Total percentage of sims which fail any of the previous conditions
     * @private
     */
    _prepViewData(simData, sceDict) {
        const _this = this;
        let stats = _.reduce(simData,
            function (result, value, key) {
                let clearedMaxStops = sceDict[value.scenarioId]
                    .sceneEvaluator.eval(value, 'evalAgainstMaxStops');
                let clearedRunningTime = sceDict[value.scenarioId]
                    .sceneEvaluator.eval(value, 'evalAgainstMaxRunningTime');
                let collision = sceDict[value.scenarioId]
                    .sceneEvaluator.eval(value, 'evalForCollision');

                result.countExceededMaxStops += clearedMaxStops ? 0 : 1;
                result.countExceededRunningTime += clearedRunningTime ? 0 : 1;
                result.countCollisions += collision ? 1 : 0;
                result.total += (!clearedMaxStops || !clearedMaxStops || collision) ? 1 : 0;
                return result;
            }, {
                countExceededMaxStops: 0,
                countExceededRunningTime: 0,
                countCollisions: 0,
                total: 0
            });

        let p_stats = _.reduce(stats, (p_stats, stat, key) => {
            p_stats['p_' + key] = simData.length > 0 ? Math.round(stat * 10000 / simData.length) / 100 : undefined;
            return p_stats;
        }, {});
        Object.assign(stats, p_stats);

        return stats;
    }
}