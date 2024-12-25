import { useEffect, useState } from 'react';
import List from './components/List';
import { v4 as uuidv4 } from 'uuid';
import {date} from './components/CurrentDate';
import CurrentDate from './components/CurrentDate';
import Context from './context/Context';

function App() {
  const [tasks, setTasks] = useState(() =>
    !localStorage.getItem('tasks') ? [] : JSON.parse(localStorage.getItem('tasks')),
  );
  const [taskTitle, setTaskTitle] = useState('');
  const [editTaskTitle, setEditTaskTitle] = useState('');
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const [counter, setCounter] = useState(() =>
  !localStorage.getItem('tasks') ? 0 : JSON.parse(localStorage.getItem('counter')),);


  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('counter', JSON.stringify(counter));
  }, [tasks]);

  const addTask = (e) => {
    if (e.key === 'Enter' && taskTitle) {
      values.setTasks([
        ...values.tasks,
        {
          id: uuidv4(),
          title: values.taskTitle,
          status: false,
          addTime: `${values.hours}:${values.minutes}:${values.seconds}`
        },
      ]);
      values.setTaskTitle('');
      values.setCounter(prev => prev + 1);
    }
  };

  const values = {
    tasks,
    setTasks,
    setCounter,
    taskTitle,
    setTaskTitle,
    editTaskTitle,
    setEditTaskTitle,
    hours,
    minutes,
    seconds
  }

  return (
    <Context.Provider value={values}>
    <div className="container">
      <h1>Note your task</h1>
      <CurrentDate />
      <h2>Unfinished tasks: {counter}</h2>
      <div className="input-field">
        <input
          type="text"
          value={values.taskTitle}
          onChange={(e) => values.setTaskTitle(e.target.value)}
          onKeyDown={addTask}
        />
        <label className={values.taskTitle && 'none'}>Task name</label>
      </div>
      <List/>
    </div>
    </Context.Provider>
  );
}

export default App;
