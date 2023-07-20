import React, { useEffect, useState } from "react";
import Task from "./Interfaces/Task";
import UpdateTask from "./Popups/UpdateTask";
import DeleteTask from "./Popups/DeleteTask";
import isInDeadLine from "./Functions/isInDeadline";
import reverseDateString from "./Functions/reverseDateString";


//Colors
const baseColor = {
  primary: "#91b5c2",
  secondary: "#e3e9eb",
};

const alertColor = {
  primary: "#e18e8e",
  secondary: "#ebe3e3",
};

const checkColor = {
  primary: "#93dd86",
  secondary: "#e8f3d4",
};

const irrelevantColor = {
  primary: "#D3D3D3",
  secondary: "#F5F5F5"
}

const Card = (props: any) => {
  const taskObj = props.taskObj;
  const updateListArray = props.updateListArray;
  const changeTaskStatus = props.changeTaskStatus;
  const deleteModal = props.deleteModal;

  //Modals
  const [toggleUpdateModal, setToggleUpdateModal] = useState(false);

  //Initialize card with base color
  const [color, setColor] = useState(baseColor);

  //handle check
  const handleCheck = () => {
    let tempObj: Task = {
      taskId: taskObj.taskId,
      taskName: taskObj.taskName,
      description: taskObj.description,
      deadline: taskObj.deadline,
      status: "checked",
    };
    changeTaskStatus(tempObj);
  };

  
  //Change opacity based on relevance of task
  const [makeInvisible, setMakeInvisible] = useState("")

  //handle check
  const handleIrrelevant = () => {
    let tempObj: Task = {
      taskId: taskObj.taskId,
      taskName: taskObj.taskName,
      description: taskObj.description,
      deadline: taskObj.deadline,
      status: "irrelevant",
    };
    setMakeInvisible("makeInvisible")
    changeTaskStatus(tempObj);
  };

  const changeToBaseStatus = () => {
    let tempObj: Task = {
      taskId: taskObj.taskId,
      taskName: taskObj.taskName,
      description: taskObj.description,
      deadline: taskObj.deadline,
      status: "base",
    };
    changeTaskStatus(tempObj);
  }

  //Current time handle
  const [currentTime, setCurrentTime] = useState(new Date());

  //Update the current time
  const updateCurrentTime = () => {
    setCurrentTime(new Date());
  };

  // Set up an interval to update the current time every second (adjust the interval as needed)
  useEffect(() => {
    const intervalId = setInterval(updateCurrentTime, 1000); // Update every second
    return () => clearInterval(intervalId);
  }, []);


  //Check Deadline
  useEffect(() => {
    //Define object
    let tempObj: Task = {
      taskId: taskObj.taskId,
      taskName: taskObj.taskName,
      description: taskObj.description,
      deadline: taskObj.deadline,
      status: taskObj.status,
    };
    //Make card transparent if irrelevant
    if(taskObj.status != "irrelevant"){
      setMakeInvisible("");
    }
    if (taskObj.status != "checked") {
      if(taskObj.status!="irrelevant") {
        if(!isInDeadLine(taskObj)){
          tempObj.status = "alert";
        }
        else {
          tempObj.status = "base";  
        }
      } 
    }
    changeTaskStatus(tempObj);
  }, [taskObj.deadline, taskObj.status, currentTime]);

  //Set Task Colors
  useEffect(() => {
    if (taskObj.status === "base") {
      setColor(baseColor);
    }
    if (taskObj.status === "checked") {
      setColor(checkColor);
    }
    if (taskObj.status === "alert") {
      setColor(alertColor);
    }
    if (taskObj.status === "irrelevant") {
      setColor(irrelevantColor);
    }
  }, [taskObj.status, currentTime]);

  const updateTask = (obj: Task) => {
    //Defined in TaskList
    updateListArray(obj);
    //Closing modal
    setToggleUpdateModal(false);
  };

  return (
    <div className={`card-wrapper ${makeInvisible}`}>
      <div
        className={"card-top"}
        style={{ backgroundColor: color.primary }}
      ></div>
      <div className="task-holder">
        <span
          className={'card-header'}
          style={{ backgroundColor: color.secondary, borderRadius: "10px" }}
        >
          {taskObj.taskName}
        </span>
        <p className="mt-3">{taskObj.description}</p>

        {/* icons */}
        <div style={{ position: "absolute", right: "20px", top: "20px" }}>
          {/* check icon */}
          {taskObj.status !== "checked" ? <i className="fas fa-check icon" onClick={() => handleCheck()}></i> : <i className="fa-sharp fa-solid fa-rotate-left icon" onClick={() => changeToBaseStatus()}></i>}
        </div>
        <div style={{ position: "absolute", right: "20px", top: "50px" }}>
          {/* eye icon */}
          {taskObj.status !== "irrelevant" ? <i className="fas fa-eye-slash icon" onClick={() => handleIrrelevant()}></i> : <i className="fas fa-eye icon" onClick={() => changeToBaseStatus()}></i>}
        </div>
        <div style={{ position: "absolute", right: "20px", bottom: "20px" }}>
          {/* edit icon */}
          <i
            className="far fa-edit icon"
            onClick={() => setToggleUpdateModal(true)}
          ></i>
          {/* delete icon */}
          <i
            className="fas fa-trash-alt icon"
            onClick={() => {deleteModal(taskObj.taskId)}}
          ></i>
        </div>
        <div
          className="date"
          style={{position: "absolute", left: "1em", bottom: "20px" }}
        >
          {reverseDateString(taskObj.deadline[0])}
        </div>
        <div
          className="date"
          style={{position: "absolute", left: "7em", bottom: "20px"}}
        >
          {taskObj.deadline[1]}
        </div>
      </div>
      <UpdateTask trigger={toggleUpdateModal} setTrigger={setToggleUpdateModal} updateTask={updateTask} taskObj={taskObj} />
    </div>
  );
};

export default Card;
