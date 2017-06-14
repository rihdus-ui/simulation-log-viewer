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
        // generator
        {
            "startTime": "2017-06-14T13:52:36.776Z",
            "_runTime": 1466,
            "endTime": "2017-06-14T15:20:34.376Z",
            "scenarioId": "sce-2",
            "carBuild": "car-47",
            "result": {
                "numberOfStops": 37,
                "hasCollision": false
            }
        },
        {
            "startTime": "2017-06-14T13:52:36.776Z",
            "_runTime": 2908,
            "endTime": "2017-06-14T16:47:05.576Z",
            "scenarioId": "sce-181-lo",
            "carBuild": "car-blue",
            "result": {
                "numberOfStops": 3,
                "hasCollision": false
            }
        },
        {
            "startTime": "2017-06-14T13:52:36.776Z",
            "_runTime": 2124,
            "endTime": "2017-06-14T16:00:03.176Z",
            "scenarioId": "sce-2",
            "carBuild": "car-47",
            "result": {
                "numberOfStops": 19,
                "hasCollision": false
            }
        },
        {
            "startTime": "2017-06-14T13:52:36.776Z",
            "_runTime": 1684,
            "endTime": "2017-06-14T15:33:39.176Z",
            "scenarioId": "sce-181-lo",
            "carBuild": "car-47",
            "result": {
                "numberOfStops": 36,
                "hasCollision": false
            }
        },
        {
            "startTime": "2017-06-14T13:52:36.776Z",
            "_runTime": 2312,
            "endTime": "2017-06-14T16:11:19.976Z",
            "scenarioId": "sce-2",
            "carBuild": "car-green",
            "result": {
                "numberOfStops": 36,
                "hasCollision": false
            }
        },
        {
            "startTime": "2017-06-14T13:52:36.777Z",
            "_runTime": 2172,
            "endTime": "2017-06-14T16:02:55.977Z",
            "scenarioId": "sce-13",
            "carBuild": "car-green",
            "result": {
                "numberOfStops": 19,
                "hasCollision": false
            }
        },
        {
            "startTime": "2017-06-14T13:52:36.777Z",
            "_runTime": 1360,
            "endTime": "2017-06-14T15:14:12.777Z",
            "scenarioId": "sce-2",
            "carBuild": "car-green",
            "result": {
                "numberOfStops": 20,
                "hasCollision": false
            }
        },
        {
            "startTime": "2017-06-14T13:52:36.777Z",
            "_runTime": 1559,
            "endTime": "2017-06-14T15:26:09.177Z",
            "scenarioId": "sce-1",
            "carBuild": "car-47",
            "result": {
                "numberOfStops": 24,
                "hasCollision": false
            }
        },
        {
            "startTime": "2017-06-14T13:52:36.777Z",
            "_runTime": 511,
            "endTime": "2017-06-14T14:23:16.377Z",
            "scenarioId": "sce-181-lo",
            "carBuild": "car-47",
            "result": {
                "numberOfStops": 26,
                "hasCollision": false
            }
        },
        {
            "startTime": "2017-06-14T13:52:36.777Z",
            "_runTime": 2903,
            "endTime": "2017-06-14T16:46:47.577Z",
            "scenarioId": "sce-1",
            "carBuild": "car-green",
            "result": {
                "numberOfStops": 17,
                "hasCollision": false
            }
        }
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
        },
        {
            "scenarioId": "sce-1",
            "maxNumberOfStops": 3,
            "maxRunningTime": 29175754021
        },
        {
            "scenarioId": "sce-2",
            "maxNumberOfStops": 5,
            "maxRunningTime": 158944023
        },
        {
            "scenarioId": "sce-181-lo",
            "maxNumberOfStops": 75,
            "maxRunningTime": 400607563
        },
        {
            "scenarioId": "sce-13",
            "maxNumberOfStops": 215,
            "maxRunningTime": 134946660
        }
    ]
};
