import { useState,useEffect } from "react";
import axios from 'axios'
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Search from "./components/Search";
import TodoList from "./components/TodoList";
import Filter from "./components/Filter";

function App() {
  const [todos, setTodos] = useState([]);
  const [errors,setErrors]=useState("")
  useEffect(()=>{
    axios.get("http://127.0.0.1:8000/todos")
    .then(res=>setTodos(res.data))
    .catch(err => setErrors(err.message))
  },[])
// add todo function
const addTodo = (data) => {
  const originalTodos = [...todos];
  axios.post("http://127.0.0.1:8000/todos/", data)
    .then(res => setTodos([...originalTodos, res.data]))
    .catch(err => {
        setErrors(err.message);
        setTodos(originalTodos);
    });
};


  // delete function
  const delTodo = (id) => {
    setTodos(todos.filter( todo => todo.id != id ))
    const originalTodos=[...todos]
    axios.delete(`http://127.0.0.1:8000/todos/${id}/`)
    .catch(err => {
      setErrors(err.message)
      setTodos(originalTodos)
    })
  }


  // update function
  // update function
const updateTodo = (e, id, text, todo) => {
  e.preventDefault();

  const updatedTodo = { ...todo, task: text, status: "Active" };

  axios.put(`http://127.0.0.1:8000/todos/${id}/`, updatedTodo)
    .then((res) => {
      setTodos(todos.map(t => t.id === id ? res.data : t));
    })
    .catch(err => setErrors(err.message));
};


  const completeTodo = (e, id) => {

    if(e.target.checked){
      console.log("okay")
      setTodos(todos.map(todo => todo.id == id ? { ...todo, status:"Completed"}: todo))
    }
    else
    {
      console.log("omo")
      setTodos(todos.map(todo => todo.id == id ? { ...todo, status:"Active"}: todo))
    }

   
  }

  const filterTodo = (cat_value) => {
    // setTodos(todos.filter(todo => todo.status == cat_value))
    setTodos(todos.filter((todo) => todo.status == cat_value))
  }


  return (
    <div className="todo-container">
      { errors && <p>{errors}</p> }
      <Search addTodo = { addTodo } />
      <Filter filter_todo = { filterTodo }/>
      <TodoList todos = { todos } delTodo = { delTodo } update_todo = { updateTodo } complete_todo = { completeTodo } filter_todo = { filterTodo } />
    </div>
  );
}



export default App;
