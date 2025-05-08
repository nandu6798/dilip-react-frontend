import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('http://node-svc.demo-project.svc.cluster.local:3001/api/tasks');
    setTasks(response.data);
  };

  const addTask = async () => {
    await axios.post('http://node-svc.demo-project.svc.cluster.local:3001/api/tasks', { title });
    setTitle('');
    fetchTasks();
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
