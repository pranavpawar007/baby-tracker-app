import React from 'react';
import DailySchedule from './DailySchedule';
import MilestoneTracker from './MilestoneTracker';
import './styles.css';


function App() {
    return (
        <div className="App">
            <DailySchedule />
            <MilestoneTracker />
        </div>
    );
}

export default App;
