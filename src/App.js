import React, { useState, useEffect, lazy, Suspense } from 'react';
import './App.css';
import Header from "./MyComponent/Header";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


// const Todos = lazy(() => import('./MyComponent/Todos'))
// const AddTodo = lazy(() => import('./MyComponent/AddTodo'))
// const Footer = lazy(() => import('./MyComponent/Footer'))
// const About = lazy(() => import('./MyComponent/About'))
import {Todos} from "./MyComponent/Todos";
import {AddTodo} from "./MyComponent/AddTodo";
import {Footer} from "./MyComponent/Footer";
import {About} from "./MyComponent/About";


function App() {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  }
  else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const onDelete = (todo) => {
    console.log("I am ondelete of todo", todo);

    setTodos(todos.filter((e) => {
      return e !== todo;
    }));
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  const addTodo = (title, desc) => {
    console.log("I am reading this todo", title, desc)
    let sno;
    if (todos.length === 0) {
      sno = 0;
    }
    else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    }
    setTodos([...todos, myTodo]);
    console.log(myTodo);

  }
  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  return (
    <>
      <Router>
        <Header title="My Todos List" />
          <Switch>
            <Route exact path="/" render={() => {
              return (
                <>
                  <AddTodo addTodo={addTodo} />
                  <Todos todos={todos} onDelete={onDelete} />
                </>)
            }}>
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
          </Switch>


        <Footer />
      </Router>
    </>
  );
}

export default App;
