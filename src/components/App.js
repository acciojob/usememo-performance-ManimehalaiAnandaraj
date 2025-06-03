import React, { useState, useMemo } from "react";
import './../styles/App.css';

// Utility to generate tasks
const generateTasks = () => {
  return Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `Task ${i + 1}`,
    completed: i >= 25,
  }));
};

// Simulate slow rendering
const slowDown = (ms = 2) => {
  const end = Date.now() + ms;
  while (Date.now() < end) {}
};

// Task List Component
const TaskList = ({ tasks }) => {
  return (
    <ul>
      {tasks.map((task) => {
        slowDown(); // Slow down each task rendering
        return (
          <li key={task.id}>
            <span>{task.title}</span>{" "}
            <span>{task.completed ? "✅" : "🕒"}</span>
          </li>
        );
      })}
    </ul>
  );
};

function App() {
  const [tasks] = useState(generateTasks);
  const [filter, setFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(false);

  const filteredTasks = useMemo(() => {
    console.log("Filtering tasks...");
    switch (filter) {
      case "Active":
        return tasks.filter((task) => !task.completed);
      case "Completed":
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  }, [filter, tasks]);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <header>
        <h1>Todo App</h1>
        <button onClick={() => setDarkMode((prev) => !prev)}>
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
      </header>

      <div className="filters">
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Active")}>Active</button>
        <button onClick={() => setFilter("Completed")}>Completed</button>
      </div>

      <TaskList tasks={filteredTasks} />
    </div>
  );
}

export default App;
