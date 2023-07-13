import React, { useState } from "react";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import TaskList from "./components/TaskList";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const App = () => {
  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = (formName: string) => {
    setCurrentForm(formName);
  };

  return (
    // <TaskList/>
    <div>

      {/* {currentForm === "login" ? <Login onFormSwitch = {toggleForm}/> : <Register onFormSwitch = {toggleForm}/>} */}
      <TaskList />
    </div>
  );
};

export default App;
