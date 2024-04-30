import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MilestoneTracker() {
    const [milestones, setMilestones] = useState([]);
    const [milestone, setMilestone] = useState('');
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('');

    // Fetch milestone data from the server
    useEffect(() => {
        axios.get('/api/milestones')
            .then(response => {
                setMilestones(response.data);
            })
            .catch(err => console.error(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newMilestoneData = {
            milestone,
            date,
            notes,
        };

        // Add new milestone data to the server
        axios.post('/api/milestones', newMilestoneData)
            .then(response => {
                const newMilestone = response.data;

                // Add the new milestone entry to the list
                setMilestones([...milestones, newMilestone]);

                // Reset form fields
                setMilestone('');
                setDate('');
                setNotes('');
            })
            .catch(err => console.error(err));
    };

    const handleDelete = (id) => {
        // Delete milestone data from the server
        axios.delete(`/api/milestones/${id}`)
            .then(() => {
                // Remove the milestone entry from the list
                setMilestones(milestones.filter(entry => entry._id !== id));
            })
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h2>Milestone Tracker</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Milestone: </label>
                    <input type="text" value={milestone} onChange={(e) => setMilestone(e.target.value)} required />
                </div>
                <div>
                    <label>Date: </label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>
                <div>
                    <label>Notes: </label>
                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
                </div>
                <button type="submit">Add Entry</button>
            </form>

            <h3>Milestone Entries:</h3>
            <ul>
                {milestones.map((entry, index) => (
                    <li key={index}>
                        <strong>Milestone:</strong> {entry.milestone}, <strong>Date:</strong> {entry.date}, <strong>Notes:</strong> {entry.notes}
                        <button onClick={() => handleDelete(entry._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MilestoneTracker;
