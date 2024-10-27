import { useState } from "react";
import axios from "axios";
import Search from "./components/Search";
import TodoList from "./components/TodoList";
import Filter from "./components/Filter";
import ProjectList from "./components/ProjectList";
import { AiFillBackward, AiFillDelete } from 'react-icons/ai';

function App() {
  const [todos, setTodos] = useState([]);
  const [errors, setErrors] = useState("");
  const [projectSelected, setProjectSelected] = useState(false); // Track if a project is selected
  const [selectedProjectName, setSelectedProjectName] = useState(""); // Store selected project name

  // Add todo function
  // Add todo function
// Add todo function
const addTodo = (data) => {
  // Ensure the project ID is added to the data object
  const todoData = { ...data, project: selectedProjectId }; // Assuming selectedProjectId holds the ID of the selected project
  const originalTodos = [...todos];

  axios
    .post("http://127.0.0.1:8000/todos/", todoData)
    .then((res) => setTodos([...originalTodos, res.data]))
    .catch((err) => {
      setErrors(err.message);
      setTodos(originalTodos);
    });
};



  // Delete function
  const delTodo = (id) => {
    const originalTodos = [...todos];
    setTodos(todos.filter((todo) => todo.id !== id));
    axios.delete(`http://127.0.0.1:8000/todos/${id}/`).catch((err) => {
      setErrors(err.message);
      setTodos(originalTodos);
    });
  };

  // Update function
  const updateTodo = (e, id, text, todo) => {
    e.preventDefault();
    const updatedTodo = { ...todo, task: text, project: selectedProjectId };
  
    axios
      .put(`http://127.0.0.1:8000/todos/${id}/`, updatedTodo)
      .then((res) => {
        setTodos(todos.map((t) => (t.id === id ? res.data : t)));
      })
      .catch((err) => setErrors(err.message));
  };

  const completeTodo = (e, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, status: e.target.checked ? "Completed" : "Active" }
          : todo
        )
    );
  };

  const filterTodo = (cat_value) => {
    setTodos(todos.filter((todo) => todo.status === cat_value));
  };

  // Handle project selection
const [selectedProjectId, setSelectedProjectId] = useState(null);

const handleProjectSelect = (projectTodos, projectId, projectName) => {
  setTodos(projectTodos);
  setSelectedProjectId(projectId);  // Set the project ID here
  setProjectSelected(true);
  setSelectedProjectName(projectName);
};

  // Handle back button to show project list
  const handleBackToProjects = () => {
    setProjectSelected(false);
    setSelectedProjectName(""); // Reset project name
  };
  

  return (
    <div className="todo-container">
      {errors && <p>{errors}</p>}
      {!projectSelected ? (
        // Show ProjectList if no project is selected
        <ProjectList setTodos={handleProjectSelect} />
      ) : (
        // Show TodoList with project heading if a project is selected
        <>
          <h2 className="project">Project Name : {selectedProjectName}</h2>
          <Search addTodo={addTodo} />
          <Filter filter_todo={filterTodo} />
          <TodoList
            todos={todos}
            delTodo={delTodo}
            update_todo={updateTodo}
            complete_todo={completeTodo}
          />
          <div className="btn-container">
            <div className="back-btn"><AiFillBackward size={45} onClick={handleBackToProjects} /></div>
            
          </div>
        </>
      )}
    </div>
  );
}

export default App;
