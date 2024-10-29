import { useEffect, useState } from "react";
import axios from "axios";
import Search from "./components/Search";
import TodoList from "./components/TodoList";
import ProjectList from "./components/ProjectList";
import Login from "./components/Login";
import Register from "./components/Register";  // Import the Register component
import { AiFillBackward } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";

function App() {
  const [todos, setTodos] = useState([]);
  const [errors, setErrors] = useState("");
  const [projectSelected, setProjectSelected] = useState(false);
  const [selectedProjectName, setSelectedProjectName] = useState("");
  const [editingProjectName, setEditingProjectName] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const [pendingTodos, setPendingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // State to toggle between login and registration
  const [isRegistering, setIsRegistering] = useState(false);

  // Store token in local storage and set axios headers
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Separate todos into pending and completed on initial load or update
  useEffect(() => {
    if (token) {
      fetchTodos();
    }
  }, [token]);

  const fetchTodos = async (projectId) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/projects/${projectId}/todos/`);
        setTodos(response.data);
        setPendingTodos(response.data.filter((todo) => !todo.completed));
        setCompletedTodos(response.data.filter((todo) => todo.completed));
    } catch (error) {
        setErrors(error.message);
    }
};

const addTodo = (data) => {
    const todoData = { ...data, project: selectedProjectId };

    axios
      .post("http://127.0.0.1:8000/todos/", todoData)
      .then(() => {
          fetchTodos(selectedProjectId); // Re-fetch todos after adding
      })
      .catch((err) => setErrors(err.message));
};

const delTodo = async (id) => {
  const originalTodos = [...todos];
  
  // Optimistically remove the todo from the state
  const updatedTodos = todos.filter((todo) => todo.id !== id);
  setTodos(updatedTodos);
  setPendingTodos(updatedTodos.filter((todo) => !todo.completed));
  setCompletedTodos(updatedTodos.filter((todo) => todo.completed));

  try {
      await axios.delete(`http://127.0.0.1:8000/todos/${id}/`);
  } catch (err) {
      setErrors(err.message);
      // Revert to original state if there's an error
      setTodos(originalTodos);
      setPendingTodos(originalTodos.filter((todo) => !todo.completed));
      setCompletedTodos(originalTodos.filter((todo) => todo.completed));
  }
};


const updateTodo = async (e, id, text, todo) => {
  e.preventDefault();
  const updatedTodo = { ...todo, task: text, project: selectedProjectId };

  // Optimistically update the state
  const updatedTodos = todos.map((t) => (t.id === id ? updatedTodo : t));
  setTodos(updatedTodos);
  setPendingTodos(updatedTodos.filter((todo) => !todo.completed));
  setCompletedTodos(updatedTodos.filter((todo) => todo.completed));

  try {
      const res = await axios.put(`http://127.0.0.1:8000/todos/${id}/`, updatedTodo);
      // Update the specific todo with the response data
      const finalTodos = todos.map((t) => (t.id === id ? res.data : t));
      setTodos(finalTodos);
      setPendingTodos(finalTodos.filter((todo) => !todo.completed));
      setCompletedTodos(finalTodos.filter((todo) => todo.completed));
  } catch (err) {
      setErrors(err.message);
      // Revert to the original todo if there's an error
      setTodos(todos.map((t) => (t.id === id ? todo : t)));
      setPendingTodos(todos.filter((todo) => !todo.completed));
      setCompletedTodos(todos.filter((todo) => todo.completed));
  }
};



  const completeTodo = async (e, id) => {
    const isCompleted = e.target.checked;
    const updatedTodo = { ...todos.find((todo) => todo.id === id), completed: isCompleted };

    // Optimistically update the UI immediately
    setTodos((prevTodos) => prevTodos.map((t) => (t.id === id ? updatedTodo : t)));
    setPendingTodos(todos.filter((todo) => !todo.completed));
    setCompletedTodos(todos.filter((todo) => todo.completed));

    try {
        await axios.put(`http://127.0.0.1:8000/todos/${id}/`, updatedTodo);
    } catch (err) {
        setErrors(err.message);
        // Revert the UI update if the request fails
        setTodos((prevTodos) =>
            prevTodos.map((t) => (t.id === id ? { ...t, completed: !isCompleted } : t))
        );
        setPendingTodos(todos.filter((todo) => !todo.completed));
        setCompletedTodos(todos.filter((todo) => todo.completed));
    }
};


const handleProjectSelect = (projectTodos, projectId, projectName) => {
  if (projectId) {
      setProjectSelected(true);
      setSelectedProjectId(projectId);
      setSelectedProjectName(projectName);
      fetchTodos(projectId); // Fetch todos specific to the selected project
  } else {
      console.error("Invalid Project ID:", projectId);
  }
};

  const handleBackToProjects = () => {
    setProjectSelected(false);
    setSelectedProjectName("");
  };

  const handleEditProjectName = () => {
    setEditingProjectName(true);
    setNewProjectName(selectedProjectName); // Set the input field to the current project name
  };

  const handleSaveProjectName = () => {
    axios
      .put(`http://127.0.0.1:8000/projects/${selectedProjectId}/`, {
        name: newProjectName,
      })
      .then(() => {
        setSelectedProjectName(newProjectName);
        setEditingProjectName(false);
      })
      .catch((err) => setErrors(err.message));
  };

  const handleLogout = () => {
    setToken("");
    setTodos([]);
    setErrors("");
  };

  const handleRegistrationSuccess = () => {
    setIsRegistering(false);  // Switch to login view after successful registration
  };

  // Render login or registration form if the user is not authenticated
  if (!token) {
    return (
      <div>
        {isRegistering ? (
          <Register onRegistrationSuccess={handleRegistrationSuccess} />
        ) : (
          <Login setToken={setToken} />
        )}
        <button className="question" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? "Already have an account? Login" : "New user? Register"}
        </button>
      </div>
    );
  }

  return (
    <div className="todo-container">
      {/* {errors && <p>{errors}</p>} */}
      <button className="logout-btn" onClick={handleLogout}>Logout</button>

      {!projectSelected ? (
        <ProjectList setTodos={handleProjectSelect} />
      ) : (
        <>
          <div className="project-header">
            <div className="project-name-container">
              <h2 className="project">Project: {selectedProjectName}</h2>
              <button className="edit-button" onClick={handleEditProjectName}>
                <TbEdit size={20} />
              </button>
            </div>
          </div>

          <Search addTodo={addTodo} />
          <br />
          <hr />
          <br />
          <div className="todo-lists">
            <div className="pending-todos">
              <h3>Pending Tasks</h3>
              <br />
              <TodoList
                todos={pendingTodos}
                delTodo={delTodo}
                update_todo={updateTodo}
                complete_todo={completeTodo}
              />
            </div>
            <br />
            <hr />
            <br />
            <div className="completed-todos">
              <h3>Completed Tasks</h3>
              <br />
              <TodoList
                todos={completedTodos}
                delTodo={delTodo}
                update_todo={updateTodo}
                complete_todo={completeTodo}
              />
            </div>
          </div>

          <div className="btn-container">
            <div className="back-btn">
              <AiFillBackward size={45} onClick={handleBackToProjects} />
            </div>
          </div>

          {editingProjectName && (
            <div className="modal-container">
              <div className="modal">
                <h1>Update Project Name</h1>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveProjectName();
                  }}
                >
                  <input
                    type="text"
                    placeholder="Update Project Name"
                    value={newProjectName} // This will now show the original project name
                    onChange={(e) => setNewProjectName(e.target.value)}
                    required
                  />
                  <button type="submit" id="add">
                    Save
                  </button>
                </form>
                <div className="btn-container">
                  <button
                    className="cancel mod-btn"
                    onClick={() => setEditingProjectName(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
