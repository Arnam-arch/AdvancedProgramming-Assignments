import React, { useState } from "react"; 
 
function TodoApp() { 
  const [todos, setTodos] = useState([]); 
  const [input, setInput] = useState(""); 
 
  const addTodo = () => { 
    if (input.trim() === "") return; 
    setTodos([...todos, input]); 
    setInput(""); 
  }; 
 
  return ( 
    <div style={{ textAlign: "center", marginTop: "40px" }}> 
      <h2>Todo List</h2> 
 
      <input 
        type="text" 
        placeholder="Enter a todo" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
      /> 
 
      <button onClick={addTodo} style={{ marginLeft: "10px" }}> 
        Add 
      </button> 
 
      <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}> 
        {todos.map((todo, index) => ( 
          <li key={index}>{todo}</li> 
        ))} 
      </ul> 
    </div> 
  ); 
} 
 
export default TodoApp;