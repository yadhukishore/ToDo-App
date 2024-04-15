import React from "react";
import { useState, useEffect, useRef } from "react";
// React-icons
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { AiTwotoneDelete } from "react-icons/ai";
// ----

const Body = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditID] = useState(0);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addTodo = () => {
    if (inputValue !== "") {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        status: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
      if(editId){
        const editTodo= todos.find((val)=>val.id===editId);
        console.log("Again",editTodo);
        const updateEdit = todos.map((val)=>val.id===editTodo.id
        ?(val={id: val.id , text:inputValue})
        :(val={id:val.id , text:val.text}))
        setTodos(updateEdit);
        setEditID(0);
      }
    }
  };

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  //CRUDs
  const onDelete = (id) => {
    setTodos(todos.filter((val) => val.id !== id));
  };

  const onComplete = (id) => {
    let outputComplete = todos.map((list) => {
      if (list.id === id) {
        return { ...list, status: !list.status };
      }
      return list;
    });
    setTodos(outputComplete);
  };
  const onEdit = (id) => {
    const editTodo = todos.find((val) => val.id === id);
    setInputValue(editTodo.text);
    console.log("EditTodo:",editTodo)
    setEditID(editTodo.id);
  };

  return (
    <div className="todo-app">
      <h2>TODO APP</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter Your Todo"
          className="form-control"
          ref={inputRef}
        />
        <button onClick={addTodo}>{editId ? "EDIT" : "ADD"}</button>
      </form>
      <div>
        <ul className="todo-list">
          {todos.map((val) => (
            <li key={val.id} className={val.status ? "completed" : ""}>
              {val.text}
              <span>
                <IoMdDoneAll
                  id="complete"
                  title="Complete"
                  onClick={() => onComplete(val.id)}
                />
                <FiEdit id="edit" title="Edit" onClick={() => onEdit(val.id)} />
                <AiTwotoneDelete
                  id="delete"
                  title="Delete"
                  onClick={() => onDelete(val.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Body;
