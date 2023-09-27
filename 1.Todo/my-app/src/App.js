import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(()=>{
    console.log(todos);
  },[todos]);

  const addTodo = ()=>{
    if(todo!==""){
      setTodos([...todos,todo]);
      setTodo("");
    }
  };

  const deleteTodo = (text)=>{
    const newTodos = todos.filter((todo)=>{
      return todo !== text;
    });
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <header>
        <div className="App-header">
          <h1>Todo App</h1>
        </div>
      </header>
      <div className="input-wrapper">
        <input 
         type="text" 
         name="todo"
         value={todo} 
         placeholder="Create a new todo"
         onChange={(e)=>{
          setTodo(e.target.value);
         }}
        />
        <button className="add-button" onClick={addTodo}>Add</button>
      </div>
      {todos && todos.length > 0 ? (
          <ul className="todo-list">
            {todos.map((todo, index)=>(
               <div className="todo">
                <li key={index} style={{color:"#ffffff",listStyleType:"none"}}>{todo}</li>
                <button 
                 className="delete-button"
                 style={{marginLeft:"1rem"}}
                 onClick={()=>{
                  deleteTodo(todo);
                 }}
                >
                  Delete
                </button>
              </div>
            ))}
          </ul>
        ):(
          <div className="empty">
            <p style={{color:"#ffffff"}}>Todo list is empty!</p>
          </div>
        )}
    </div>
  );
}

export default App;
