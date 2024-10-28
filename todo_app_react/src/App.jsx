import { useEffect, useState } from "react";
import axios from "axios";
import Search from "./components/Search";
import TodoList from "./components/TodoList";
import ProjectList from "./components/ProjectList";
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

  useEffect(() => {
    // Separate todos into pending and completed on initial load or update
    setPendingTodos(todos.filter((todo) => !todo.completed));
    setCompletedTodos(todos.filter((todo) => todo.completed));
  }, [todos]);

  const addTodo = (data) => {
    const todoData = { ...data, project: selectedProjectId };
    const originalTodos = [...todos];

    axios
      .post("http://127.0.0.1:8000/todos/", todoData)
      .then((res) => setTodos([...originalTodos, res.data]))
      .catch((err) => {
        setErrors(err.message);
        setTodos(originalTodos);
      });
  };

  const delTodo = (id) => {
    const originalTodos = [...todos];
    setTodos(todos.filter((todo) => todo.id !== id));
    axios.delete(`http://127.0.0.1:8000/todos/${id}/`).catch((err) => {
      setErrors(err.message);
      setTodos(originalTodos);
    });
  };

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
    const isCompleted = e.target.checked;
    const updatedTodo = todos.find((todo) => todo.id === id);
    updatedTodo.completed = isCompleted;

    axios
      .put(`http://127.0.0.1:8000/todos/${id}/`, updatedTodo)
      .then((res) => {
        setTodos(todos.map((t) => (t.id === id ? res.data : t)));
      })
      .catch((err) => setErrors(err.message));
  };

  const handleProjectSelect = (projectTodos, projectId, projectName) => {
    setTodos(projectTodos);
    setSelectedProjectId(projectId);
    setProjectSelected(true);
    setSelectedProjectName(projectName);
    setNewProjectName(projectName);
  };

  const handleBackToProjects = () => {
    setProjectSelected(false);
    setSelectedProjectName("");
  };

  const handleEditProjectName = () => {
    setEditingProjectName(true);
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

  return (
    <div className="todo-container">
      {errors && <p>{errors}</p>}
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
          <br></br>
          <hr></hr>
        <br></br>
          {/* Display separate containers for Pending and Completed tasks */}
          <div className="todo-lists">
            <div className="pending-todos">
              <h3>Pending Tasks</h3>
              <br></br>
              <TodoList
                todos={pendingTodos}
                delTodo={delTodo}
                update_todo={updateTodo}
                complete_todo={completeTodo}
              />
            </div>
            <br></br>
            <hr></hr>
            <br></br>
            <div className="completed-todos">
              <h3>Completed Tasks</h3>
              <br></br>
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

          {/* Project Name Update Modal */}
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
                    value={newProjectName}
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
