import { useState, useEffect } from 'react';
import './App.css';
import ToDoForm from "./AddTask";
import ToDo from "./Task";
import axios from 'axios';

const CAT_STORAGE = 'cat-board-data';

function App() {
  const [randomFact, setRandomFact] = useState('...');
  const [catPic, setCatPic] = useState('');
  const [boardTasks, setBoardTasks] = useState([]);

  useEffect(() => {
    async function fetchBoardData() {
      try {
        const factRes = await axios.get('https://uselessfacts.jsph.pl/api/v2/facts/random');
        setRandomFact(factRes.data?.text || 'Нет данных');
      } catch (error) {
        setRandomFact('Проблема с сетью');
      }

      try {
        const catRes = await axios.get('https://api.thecatapi.com/v1/images/search');
        setCatPic(catRes.data?.[0]?.url || '');
      } catch (error) {
        setCatPic('');
      }
    }
    fetchBoardData();
  }, []);

  useEffect(() => {
    const data = localStorage.getItem(CAT_STORAGE);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) setBoardTasks(parsed);
      } catch (err) {
        setBoardTasks([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CAT_STORAGE, JSON.stringify(boardTasks));
  }, [boardTasks]);

  const addTask = (taskString) => {
    if (taskString.trim()) {
      const record = { id: Math.random().toString(36).slice(2), task: taskString, complete: false };
      setBoardTasks([...boardTasks, record]);
    }
  };

  const removeTask = (taskId) => {
    setBoardTasks(boardTasks.filter((t) => t.id !== taskId));
  };

  const handleToggle = (taskId) => {
    setBoardTasks(
      boardTasks.map((t) =>
        t.id === taskId ? { ...t, complete: !t.complete } : t
      )
    );
  };

  return (
    <div className="board-wrapper">
      <div className="top-panel">
        <div className="panel-item stat-item">
          <h2>Доска задач</h2>
          <p>Всего стикеров: {boardTasks.length}</p>
        </div>
        <div className="panel-item fact-item">
          <strong>Факт:</strong> {randomFact}
        </div>
        {catPic && (
          <div className="panel-item img-item">
            <img src={catPic} alt="Котик" />
          </div>
        )}
      </div>

      <div className="masonry-grid">
        <div className="grid-item creator-item">
          <ToDoForm addTask={addTask} />
        </div>
        
        {boardTasks.map((item) => (
          <div className="grid-item" key={item.id}>
            <ToDo
              todo={item}
              toggleTask={handleToggle}
              removeTask={removeTask}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
