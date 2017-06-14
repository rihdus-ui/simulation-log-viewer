import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SimLogView from './sim/sim-data-viewer';
import data from "./sim-data";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import _ from 'lodash';

class App extends Component {

    constructor(props) {
        super(props);
        this.filter = {};
        this.sceInput = null;
        this.buildInput = null;
        this.onFilterChange = this.onFilterChange.bind(this);

        this.state = {
            filter_scenario: null,
            filter_carBuild: null,
        };

        this.data = [];
    }

    onFilterChange(e) {
        const _this = this;
        this.setState({
            filter_scenario: this.sceInput.value,
            filter_carBuild: this.buildInput.value
        });

        this.data.simulationRuns = _.filter(data.simulationRuns, function (sim) {
            return (
                (
                    _this.sceInput.value ? sim.scenarioId.indexOf(_this.sceInput.value) !== -1 : true)
                && (
                    _this.buildInput.value ? sim.carBuild.indexOf(_this.buildInput.value) !== -1 : true
                )
            )
        });
    }

    componentWillMount() {
        this.data = Object.assign({}, data);
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <div className="container">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h2>Simulation Log Viewer</h2>
                        <p>ReactJs, create-react-app, MomentJs, Lodash</p>
                    </div>
                </div>

                <div className="container">

                    <div className="text-left">
                        <form className="">
                            <div className="form-group pull-left"
                                 style={{'marginRight': '20px'}}>
                                <label>Scenario</label>
                                <input className="form-control"
                                       onChange={this.onFilterChange}
                                       ref={(input) => { this.sceInput = input; }}
                                       type="text" placeholder="Scenario"/>
                            </div>
                            <div className="form-group pull-left">
                                <label>Car build</label>
                                <input className="form-control"
                                       onChange={this.onFilterChange}
                                       ref={(input) => { this.buildInput = input; }}
                                       type="text" placeholder=""/>
                            </div>
                        </form>
                    </div>
                    <SimLogView data={this.data} filter={this.filter}/>
                </div>

            </div>
        );
    }
}

export default App;
