import React, { useEffect, useState } from "react";
import Task from "../Interfaces/Task";
import UpdateTask from "./Popups/UpdateTask";
import DeleteTask from "./Popups/DeleteTask";
import isInDeadLine from "../Functions/isInDeadline";

const Card = (props: any) => {
  const taskObj = props.taskObj;
  const updateListArray = props.updateListArray;
  const changeTaskStatus = props.changeTaskStatus;
  const deleteModal = props.deleteModal;

  //Modals
  const [toggleUpdateModal, setToggleUpdateModal] = useState(false);

  //Initialize card with base color
  const [color, setColor] = useState("baseColor");

  //handle check
  const handleCheck = () => {
    let tempObj: Task = {
      task_id: taskObj.task_id,
      task: taskObj.task,
      description: taskObj.description,
      end_time: taskObj.end_time,
      status: "checked",
    };
    changeTaskStatus(tempObj);
  };

  //Change opacity based on relevance of task
  const [makeInvisible, setMakeInvisible] = useState("");

  //handle check
  const handleIrrelevant = () => {
    let tempObj: Task = {
      task_id: taskObj.task_id,
      task: taskObj.task,
      description: taskObj.description,
      end_time: taskObj.end_time,
      status: "irrelevant",
    };
    setMakeInvisible("makeInvisible");
    changeTaskStatus(tempObj);
  };

  const changeToBaseStatus = () => {
    let tempObj: Task = {
      task_id: taskObj.task_id,
      task: taskObj.task,
      description: taskObj.description,
      end_time: taskObj.end_time,
      status: "base",
    };
    changeTaskStatus(tempObj);
  };

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
      task_id: taskObj.task_id,
      task: taskObj.task,
      description: taskObj.description,
      end_time: taskObj.end_time,
      status: taskObj.status,
    };
    //Make card transparent if irrelevant
    if (taskObj.status != "irrelevant") {
      setMakeInvisible("");
    }
    if (taskObj.status != "checked") {
      if (taskObj.status != "irrelevant") {
        if (!isInDeadLine(taskObj)) {
          tempObj.status = "alert";
        } else {
          tempObj.status = "base";
        }
      }
    }
    changeTaskStatus(tempObj);
  }, [taskObj.end_time, taskObj.status, currentTime]);

  //Set Task Colors
  useEffect(() => {
    if (taskObj.status === "base") {
      setColor("baseColor");
    }
    if (taskObj.status === "checked") {
      setColor("checkColor");
    }
    if (taskObj.status === "alert") {
      setColor("alertColor");
    }
    if (taskObj.status === "irrelevant") {
      setColor("irrelevantColor");
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
      <div className={`card-top ${color}-primary`}></div>
      <div className="task-holder">
        <div className={`card-header ${color}-secondary`}>{taskObj.task}</div>
        <p className="task-text-holder">{taskObj.description}</p>

        {/* icons */}
        <div className="checkIconLocation">
          {/* check icon */}
          {taskObj.status !== "checked" ? (
            <i className="fas fa-check icon" onClick={() => handleCheck()}></i>
          ) : (
            <i
              className="fa-sharp fa-solid fa-rotate-left icon"
              onClick={() => changeToBaseStatus()}
            ></i>
          )}
        </div>
        <div className="eyeIconLocation">
          {/* eye icon */}
          {taskObj.status !== "irrelevant" ? (
            <i
              className="fas fa-eye-slash icon"
              onClick={() => handleIrrelevant()}
            ></i>
          ) : (
            <i
              className="fas fa-eye icon"
              onClick={() => changeToBaseStatus()}
            ></i>
          )}
        </div>
        <div className="editIconLocation">
          {/* edit icon */}
          <i
            className="far fa-edit icon"
            onClick={() => setToggleUpdateModal(true)}
          ></i>
          {/* delete icon */}
          <i
            className="fas fa-trash-alt icon"
            onClick={() => {
              deleteModal(taskObj.task_id);
            }}
          ></i>
        </div>
        <div className="date">{taskObj.end_time}</div>
      </div>
      <UpdateTask
        trigger={toggleUpdateModal}
        setTrigger={setToggleUpdateModal}
        updateTask={updateTask}
        taskObj={taskObj}
      />
    </div>
  );
};

export default Card;
