/**
 * Created by rihdus on 13/6/17.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SimLogView extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        filter: PropTypes.object.isRequired,
    };

    render() {
        return (
            <table>
                <thead>
                <tr>
                    <th>Scenario Id</th>
                    <th>Car Build</th>
                    <th>Start Time</th>
                    <th>Running Time / Max Running Time</th>
                    <th>Number of Stops / Max Stops</th>
                    <th>Collision</th>
                    <th>Result</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>

                    </td>
                </tr>
                </tbody>
            </table>
        );
    }
}


export default SimLogView;