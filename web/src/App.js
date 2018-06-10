import React, { Component } from 'react';
import './App.css';
import TimeSheet from './components/Timesheet'

class App extends Component {
    render () {
        return (
            <div className="App">
                <TimeSheet/>
            </div>
        );
    }
}

export default App;
