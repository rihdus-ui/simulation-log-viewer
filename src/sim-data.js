module.exports = {
    "simulationRuns": [
        {
            "startTime": Date.now(),
            "endTime": Date.now() + 100000,
            "scenarioId": "S0",
            "carBuild": "CarBuild-00",
            "result": {
                "numberOfStops": 0,
                "hasCollision": false
            }
        },
        {
            "startTime": Date.now(),
            "endTime": Date.now() + 50*60*60*1000,
            "scenarioId": "S1",
            "carBuild": "CarBuild-01",
            "result": {
                "numberOfStops": 1,
                "hasCollision": true
            }
        },
        {
            "startTime": Date.now(),
            "endTime": Date.now() + 1,
            "scenarioId": "S0",
            "carBuild": "CarBuild-01",
            "result": {
                "numberOfStops": 100,
                "hasCollision": false
            }
        },
    ],
    "scenarios": [
        {
            "scenarioId": "S0",
            "maxNumberOfStops": 2,
            "maxRunningTime": 1000000
        },
        {
            "scenarioId": "S1",
            "maxNumberOfStops": 1,
            "maxRunningTime": 99999999999
        }
    ]
};
