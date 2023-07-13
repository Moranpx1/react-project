import React, { useState } from "react";
import axios from "axios";
import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateTask from "./Popups/CreateTask";
import DeleteTask from "./Popups/DeleteTask";
import NavBar from "./NavBar";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Task from "./Interfaces/Task";
import Card from "./Card";

const TaskList = () => {
  //Modals
  const [toggleCreateModal, setToggleCreateModal] = useState(false);
  const [toggleDeleteModal, setToggleDeleteModal] = useState(false);

  //Set and save tasks
  const [taskList, setTaskList] = useState<Task[]>([]);

  const saveTask = (taskObj: Task) => {
    let tempList = [...taskList];
    tempList.push(taskObj);
    setTaskList(tempList);
    //Close modal
    setToggleCreateModal(false);
  };

  //Delete task
  const deleteTask = (taskId: string) => {
    //Find task by id
    const tempList = taskList.filter((task) => task.taskId !== taskId);
    setTaskList(tempList);
    console.log("Task deleted");
  };

  const deleteModal = (bool: boolean) => {
    setToggleDeleteModal(true);
  }

  //Update task
  const updateListArray = (taskObj: Task) => {
    let tempList = [...taskList];

    //Find index of on object
    const index = tempList.findIndex((obj) => {
      return obj.taskId === taskObj.taskId;
    });
    tempList[index] = taskObj;

    //console.log(tempList[index])
    setTaskList(tempList);
    window.location.reload;
    console.log("Task list after update: " + taskList);
  };

  //Change status of task
  const changeTaskStatus = (taskObj: Task) => {
    let tempList = [...taskList];

    //Find index of on objectd
    const index = tempList.findIndex((obj) => {
      return obj.taskId === taskObj.taskId;
    });
    tempList[index] = taskObj;

    //console.log(tempList[index])
    setTaskList(tempList);
    window.location.reload;
  };

  return (
    <>
    <div className="taskScreen">
      <NavBar openCreateModal={() => setToggleCreateModal(true)} />
      <div className = "center-task-container">
        <div className = "task-container">
          {taskList.map((obj) => (
            <Card
              key={obj.taskId}
              taskObj={obj}
              deleteModal={deleteModal}
              updateListArray={updateListArray}
              changeTaskStatus={changeTaskStatus}
            />
          ))}
        </div>
        <CreateTask trigger={toggleCreateModal} setTrigger={setToggleCreateModal} save={saveTask} />
        <DeleteTask trigger={toggleDeleteModal} setTrigger={setToggleDeleteModal} handleDeleteModal = {deleteModal}/>
      </div>
      </div>
    </>
  );
};

export default TaskList;
