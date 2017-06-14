/**
 * Created by rihdus on 13/6/17.
 */

import { SyncSpec } from 'bspec';

/**
 *
 * @param sce Object Scenario config.
 * @return {} SimEvaluator object.
 */
export function SimEvalFactory(sce) {
    return new SimEvaluator(sce);
}

/**
 *
 * @param sceConfig Object Scenario config.
 * @return boolean
 *  - `true` if result passes all conditions of the scenario.
 *  - `false` otherwise.
 */
function SimEvaluator(sceConfig) {
    let specStore = {
        evalAgainstMaxStops: new SyncSpec(sim => _evalAgainstMaxStops(
            sim.result.numberOfStops,
            sceConfig.maxNumberOfStops)),

        evalAgainstMaxRunningTime: new SyncSpec(sim => {
            let _startTime = new Date(sim.startTime).getTime(),
                _endTime = new Date(sim.endTime).getTime();

            return _evalAgainstMaxRunningTime(
                _endTime - _startTime, sceConfig.maxRunningTime)
        }),

        evalForCollision: new SyncSpec(sim =>
            _evalForCollision(sim.result.hasCollision))
    };
    specStore.successEvaluator =
        specStore.evalAgainstMaxRunningTime
            .and(specStore.evalAgainstMaxStops)
            .and(specStore.evalForCollision.not())
    ;

    this.eval = (sim, specName) => {
        return specStore[specName || 'successEvaluator'].isSatisfiedBy(sim);
    };
}

function _evalAgainstMaxStops(stops, maxStops) {
    return stops <= maxStops;
}

function _evalAgainstMaxRunningTime(runningTime, maxRunningTime) {
    return runningTime < maxRunningTime;
}

function _evalForCollision(hasCollision) {
    return !!hasCollision;
}
