/**
 * Created by rihdus on 13/6/17.
 */

import { SimEvalFactory } from './sim-eval';


describe('Simulation evaluator', () => {

    const data = {
        simulationRuns: [
            {
                /**
                 * Success
                 */
                startTime: Date.now(),
                endTime: Date.now() + 10,
                scenarioId: "S0",
                carBuild: "CarBuild-00",
                result: {
                    numberOfStops: 0,
                    hasCollision: false,
                }
            },
            {
                /**
                 * Fail: Running time
                 */
                startTime: Date.now(),
                endTime: Date.now() + 1000,
                scenarioId: "S0",
                carBuild: "CarBuild-00",
                result: {
                    numberOfStops: 0,
                    hasCollision: false,
                }
            },
            {
                /**
                 * Fail: Exceed Max Stops
                 */
                startTime: Date.now(),
                endTime: Date.now() + 10,
                scenarioId: "S0",
                carBuild: "CarBuild-00",
                result: {
                    numberOfStops: 4,
                    hasCollision: false,
                }
            },
            {
                /**
                 * Fail: Has Collision
                 */
                startTime: Date.now(),
                endTime: Date.now() + 10,
                scenarioId: "S0",
                carBuild: "CarBuild-00",
                result: {
                    numberOfStops: 1,
                    hasCollision: true,
                }
            }],
        scenarios: [
            {
                scenarioId: "S0",
                maxNumberOfStops: 2,
                maxRunningTime: 100,
            }]
    };

    it('has correct signature', () => {
        expect(typeof SimEvalFactory).toBe('function');
    });

    describe('Smoke tests', () => {

        let simEvaluator = null;

        beforeAll(() => {
            simEvaluator = SimEvalFactory(data.scenarios[0]);
        });

        it('passes success sim', () => {
            let successSim = data.simulationRuns[0],
                sce = data.scenarios[0];
            expect(simEvaluator.eval(successSim)).toBe(true);
            expect(simEvaluator.eval(successSim, 'evalAgainstMaxRunningTime')).toBe(true);
            expect(simEvaluator.eval(successSim, 'evalAgainstMaxStops')).toBe(true);
            expect(simEvaluator.eval(successSim, 'evalForCollision')).toBe(false);
        });

        it('fails long running sim', () => {
            let failSim = data.simulationRuns[1];
            expect(simEvaluator.eval(failSim)).toBe(false);
            expect(simEvaluator.eval(failSim, 'evalAgainstMaxRunningTime')).toBe(false);
        });

        it('fails with too many stops', () => {
            let failSim = data.simulationRuns[2];
            expect(simEvaluator.eval(failSim)).toBe(false);
            expect(simEvaluator.eval(failSim, 'evalAgainstMaxStops')).toBe(false);
        });

        it('fails sims with collision(s)', () => {
            let failSim = data.simulationRuns[3];
            expect(simEvaluator.eval(failSim)).toBe(false);
            expect(simEvaluator.eval(failSim, 'evalForCollision')).toBe(true);
        });
    })
});


