import React, { useState, useRef } from "react";
import { AiFillDelete } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";

const TodoList = ({ todos, delTodo, update_todo, complete_todo }) => {
  let taskRef = useRef(null);
  let [todoId, setTodoId] = useState(0);
  let [task, setTask] = useState("");
  let [toggle, setToggle] = useState(false);
  let [todo, setTodo] = useState({});

  const todoItem = (task, id, todo) => {
    setTodoId(id);
    setTask(task);
    setToggle(true);
    setTodo(todo);
  };

  return (
    <>
      <div className="todo-list">
        {todos.map((todo, index) => (
          <div className="todo-list-item" key={index}>
            <div className="task">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={(e) => complete_todo(e, todo.id)}
              />
              <p id="t_task" className={todo.completed ? "strike" : ""}>
                {todo.task}
              </p>
            </div>
            <div className="btn-container">
              <div className="edit">
                <TbEdit size={25} onClick={() => todoItem(todo.task, todo.id, todo)} />
              </div>
              <div className="del">
                <AiFillDelete size={25} onClick={() => delTodo(todo.id)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {toggle && (
        <div className="modal-container">
          <div className="modal">
            <h1>Update ToDo</h1>
            <form
              onSubmit={(e) => {
                update_todo(e, todoId, task);
                setToggle(false);
              }}
            >
              <input
                type="text"
                ref={taskRef}
                placeholder="Update Todo"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                required
              />
              <button id="add">Save</button>
            </form>
            <div className="btn-container">
              <button className="cancel mod-btn" onClick={() => setToggle(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoList;
