import React, { Component } from 'react'
import axios from 'axios'
import TimesheetItem from './TimesheetItem'

class Timesheet extends Component {
    state = {
        timesheet: [],
        errors: null
    };

    componentDidMount () {
        axios.get('/api/timesheet/all')
            .then(res => this.setState({ timesheet: res.data }))
            .catch(err => this.setState({ errors: err }))
    }

    render () {
        let timesheetData;

        if ( this.state.timesheet.length === 0 ) {
            timesheetData = (
                <tr className="row">
                    <td>There are no timesheet data</td>
                </tr>
            )
        } else {
            timesheetData = this.state.timesheet.map(item => (
                    <TimesheetItem key={item._id} timesheet={item}/>
                )
            )
        }

        return (
            <div className="timesheet">
                <div className="container">
                    <h2 className="mb-4">
                        TimeSheet Data
                    </h2>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Job</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Total Hour</th>
                        </tr>
                        </thead>
                        <tbody>
                        {timesheetData}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Timesheet