import { useEffect, useState } from "react";
import "./App.css";

function App() {
  //Array Desturcting
  const [todo, setTodo] = useState({
    id: "",
    title: "",
    body: "",
    userId: ""
  });
  const [todos, setTodos] = useState([]);
  const [todoMsg, setTodoMsg] = useState("");

  const handleInput = (e) => {
    const copyOfTodo = {...todo};
    copyOfTodo[e.target.name] = e.target.value;
    setTodo(copyOfTodo);
  };

  useEffect(() => {
    console.log(todos);
    console.log(todoMsg);
  }, [todos, todoMsg]);

  useEffect(() => {
    console.log("Calling before API");
    //Fetch is added to callback queue. fetch has higher prior
    //IO call
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => setTodos(json));
      //event loop is an infinite loop which will process the callbacks present 
      //in micro task queue on first priority and macro task queue on 2nd priority (callback queue). 
      //event loop processes the queue based on the prority set internally.
      //two types of queue. Micro task and Macro Queue, fetch added to micro task queue. Priority is given to micro task queue. 
      //timeout is added to macro task queue
      console.log("api data fetched")
      //setTimeout is also getting added to callback queue
      //have lower priority
      window.setTimeout(()=>{console.log("timeout is called!")},1000);
      console.log("Calling after timeout!");
  }, []);

  const addTodo = () => {
    if (todo.title !== "" && todo.body !== "" && todo.userId !== "") {
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then((response) => response.json())
      .then((json) => {
        setTodos([...todos,json])//level 1 copy
        //JS, objects and array are call by reference.
      });

      setTodo({
        id: "",
        title: "",
        body: "",
        userId: ""
      });

      setTodoMsg("");
    } else {
      setTodoMsg("Fill all details!");
    }
  };

  //linting the code 
  const editFill = (id)=>{
    todos.filter((todo)=>{
      if(todo.id==id)
        setTodo(todo);
    });
  }

  const editTodo = (id) => {
    if(todo.id!==""){
      fetch("https://jsonplaceholder.typicode.com/posts/"+todo.id, {
        method: "PUT",
        body: JSON.stringify(todo),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then((response) => response.json())
      .then((json) => {
        const copyTodos = todos.filter((todo)=>{
                        if(todo.id===json.id){
                          todo.title=json.title;
                          todo.body=json.body;
                          todo.userId=json.userId;
                        }
                        return todo;
                      });
        setTodos(copyTodos);
      });
      setTodo({
        id: "",
        title: "",
        body: "",
        userId: ""
      });
      setTodoMsg("");
    }else{
      setTodoMsg("Select Task to Edit!")
    }
  };

  const deleteTodo = (id) => {
    fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "DELETE",
    });

    const newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });

    setTodos(newTodos);
  };

  return (
    <div className="App">
      <header>
        <div className="App-header">
          <h1>Todo App 2.0</h1>
        </div>
      </header>
      <div className="input-wrapper">
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="id" style={{ color: "#ffffff", padding: "1rem" }}>
                  Id
                </label>
              </td>
              <td>
                <input
                  type="number"
                  id="id"
                  name="id"
                  value={todo.id}
                  placeholder="Id"
                  onChange={handleInput}
                  disabled
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="title" style={{ color: "#ffffff", padding: "1rem" }}>
                  Title
                </label>
              </td>
              <td>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={todo.title}
                  placeholder="Title"
                  onChange={handleInput}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="body" style={{ color: "#ffffff", padding: "1rem" }}>
                  Body
                </label>
              </td>
              <td>
                <input
                  type="text"
                  id="body"
                  name="body"
                  value={todo.body}
                  placeholder="Body"
                  onChange={handleInput}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="userId" style={{ color: "#ffffff", padding: "1rem" }}>
                  UserId
                </label>
              </td>
              <td>
                <input
                  type="number"
                  id="userId"
                  name="userId"
                  value={todo.userId}
                  placeholder="User Id"
                  onChange={handleInput}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ padding: "1rem", textAlign:"center"}}>
                <button className="add-button" style={{marginLeft:"5rem"}} onClick={addTodo}>
                  Add
                </button>
                <button className="edit-button" style={{marginLeft:"1rem"}} onClick={editTodo}>
                  Update
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="empty">
        <p style={{ color: "red" }}>{todoMsg}</p>
      </div>
      <table className="dataTable">
        <thead style={{ color: "#ffffff" }}>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Content</th>
            <th>User</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody style={{ color: "#ffffff" }}>
        {todos && todos.length > 0 ? (
            todos.map((todo, index) => (
              <tr key={index}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>{todo.body}</td>
                <td>{todo.userId}</td>
                <td>
                  <button
                    className="delete-button"
                    style={{ marginLeft: "1rem" }}
                    onClick={() => {
                      deleteTodo(todo.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="edit-button"
                    style={{ marginLeft: "1rem" }}
                    onClick={() => {
                      editFill(todo.id);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="empty">
              <td colSpan={6} style={{ color: "#ffffff" }}>
                List is empty!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;