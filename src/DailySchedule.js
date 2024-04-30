import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DailySchedule() {
    const [schedule, setSchedule] = useState([]);
    const [activity, setActivity] = useState('');
    const [time, setTime] = useState('');
    const [notes, setNotes] = useState('');

    // Fetch schedule data from the server
    useEffect(() => {
        axios.get('/api/schedule')
            .then(response => {
                setSchedule(response.data);
            })
            .catch(err => console.error(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newScheduleData = {
            activity,
            time,
            notes,
        };

        // Add new schedule data to the server
        axios.post('/api/schedule', newScheduleData)
            .then(response => {
                const newSchedule = response.data;

                // Add the new schedule entry to the list
                setSchedule([...schedule, newSchedule]);

                // Reset form fields
                setActivity('');
                setTime('');
                setNotes('');
            })
            .catch(err => console.error(err));
    };

    const handleDelete = (id) => {
        // Delete schedule data from the server
        axios.delete(`/api/schedule/${id}`)
            .then(() => {
                // Remove the schedule entry from the list
                setSchedule(schedule.filter(entry => entry._id !== id));
            })
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h2>Daily Schedule</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Activity: </label>
                    <input type="text" value={activity} onChange={(e) => setActivity(e.target.value)} required />
                </div>
                <div>
                    <label>Time: </label>
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                </div>
                <div>
                    <label>Notes: </label>
                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
                </div>
                <button type="submit">Add Entry</button>
            </form>

            <h3>Schedule Entries:</h3>
            <ul>
                {schedule.map((entry, index) => (
                    <li key={index}>
                        <strong>Activity:</strong> {entry.activity}, <strong>Time:</strong> {entry.time}, <strong>Notes:</strong> {entry.notes}
                        <button onClick={() => handleDelete(entry._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DailySchedule;
