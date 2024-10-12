import { useState, useEffect } from "react";
import axios from "axios";

function Habits() {
    const [habits, setHabits] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        const fetchHabits = async () => {
            const res = await axios.get('/api/habits', {
                headers: { 'auth-token': localStorage.getItem('token') }
            });
            setHabits(res.data);
        };
        fetchHabits();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/habits', { title }, {
                headers: { 'auth-token': localStorage.getItem('token') }
            });
            setHabits([...habits, res.data]);
            setTitle("");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h1>Your Habits</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New Habit" />
                <button type="submit">Add Habit</button>
            </form>
            <ul>
                {habits.map(habit => (
                    <li key={habit._id}>{habit.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default Habits;
