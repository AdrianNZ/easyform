import React from 'react'
import Moment from 'react-moment'

const timesheetItem = ( props ) => {
    const { job, name, from, to } = props.timesheet;
    const start = new Date(from);
    const end = new Date(to);

    let totalHour;

    if ( !to ) {
        totalHour = null
    } else {
        totalHour = end.getHours() - start.getHours()
    }

    return (
        <tr>
            <td>{name}</td>
            <td>{job}</td>
            <td><Moment format="YYYY-MM-DD HH:mm">{from}</Moment></td>
            <td>{!to ? 'Working...' : <Moment format="YYYY-MM-DD HH:mm">{to}</Moment>}</td>
            <td>{totalHour}</td>
        </tr>
    )
};

export default timesheetItem