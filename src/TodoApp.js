import React, { useState } from 'react';
import { Trash2, Edit } from 'lucide-react';

const TodoApp = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Exercise', completed: true },
    { id: 2, text: 'Pray', completed: false },
    { id: 3, text: 'Eat', completed: false },
    { id: 4, text: 'Work', completed: false },
    { id: 5, text: 'Sleep', completed: false },
  ]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('All');

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Active') return !task.completed;
    if (filter === 'Completed') return task.completed;
    return true;
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-blue-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">TodoMatic</h1>
      <form onSubmit={addTask} className="mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="w-full mt-2 p-2 bg-purple-900 text-white rounded">
          Add
        </button>
      </form>
      <div className="flex justify-between mb-4">
        <button 
          onClick={() => setFilter('All')} 
          className={`px-4 py-2 ${filter === 'All' ? 'bg-gray-200' : ''}`}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('Active')} 
          className={`px-4 py-2 ${filter === 'Active' ? 'bg-gray-200' : ''}`}
        >
          Active
        </button>
        <button 
          onClick={() => setFilter('Completed')} 
          className={`px-4 py-2 ${filter === 'Completed' ? 'bg-gray-200' : ''}`}
        >
          Completed
        </button>
      </div>
      <p className="mb-4">{tasks.filter(task => !task.completed).length} tasks remaining</p>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className="mr-2"
            />
            <span className={task.completed ? 'line-through' : ''}>{task.text}</span>
            <button className="ml-auto mr-2 p-1">
              <Edit size={16} />
            </button>
            <button onClick={() => deleteTask(task.id)} className="p-1 text-red-500">
              <Trash2 size={16} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
