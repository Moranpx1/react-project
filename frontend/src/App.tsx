import React, {useState} from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import TaskList from "./components/TaskList";
import "bootstrap/dist/css/bootstrap-grid.min.css";

const App = () => {

  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = (formName: string) => {
    setCurrentForm(formName);
  }

  return (
    // <TaskList/>
    <div className="App">
      {currentForm === "login" ? <Login onFormSwitch = {toggleForm}/> : <Register onFormSwitch = {toggleForm}/>}
    </div>  
  );
};

export default App;