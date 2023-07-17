import React, { useState } from "react";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Registered from "./components/Register/Registered";
import TaskList from "./components/TaskList";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";
//context
import { UserNameContext, UserNameProvider } from "./contexts/userName";
import { TasksContext, TasksProvider} from "./contexts/tasks";

const App = () => {

  return (
    <TasksProvider>
    <UserNameProvider>
      <Router>
        <Routes>
          <Route path = "/" Component={Login}></Route>
          <Route path = "/login" Component={Login}></Route>
          <Route path = "/register" Component={Register}></Route>
          <Route path = "/registered" Component={Registered}></Route>
          <Route path = "/tasks" Component={TaskList}></Route>
        </Routes>
      </Router>
    </UserNameProvider>
    </TasksProvider>
  );
};

export default App;
