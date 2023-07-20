import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateTask from "./Popups/CreateTask";
import DeleteTask from "./Popups/DeleteTask";
import NavBar from "./NavBar";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Task from "./Interfaces/Task";
import Card from "./Card";
import { TasksContext } from "../contexts/tasks";
import { useActionData } from "react-router-dom";

const TaskList = () => {

  //Modals
  const [toggleCreateModal, setToggleCreateModal] = useState(false);
  const [deleteModalTaskId, setDeleteModalTaskId] = useState("");

  //Set and save tasks
  const [taskList, setTaskList] = useState<Task[]>([]);

  //Context
  const {tasks, setTasks} = useContext(TasksContext);
  //set taskList is tasks context everytime it changes
  useEffect(()=> {setTasks(taskList)}, [taskList])
  

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

  //Update task
  const updateListArray = (taskObj: Task) => {
    let tempList = [...taskList];

    //Find index of on object
    const index = tempList.findIndex((obj) => {
      return obj.taskId === taskObj.taskId;
    });
    tempList[index] = taskObj;

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

  //Search Query
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="task-screen">
      <NavBar searchQuery = {searchQuery} setSearchQuery = {setSearchQuery} openCreateModal={() => setToggleCreateModal(true)} />
      <div>
        <div className = "task-container">
        {taskList
              .filter((task) =>
                task.taskName.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((obj) => (
            <Card
              key={obj.taskId}
              taskObj={obj}
              deleteModal={setDeleteModalTaskId}
              updateListArray={updateListArray}
              changeTaskStatus={changeTaskStatus}
            />
          ))}
        </div>
        <CreateTask trigger={toggleCreateModal} setTrigger={setToggleCreateModal} save={saveTask} />
        <DeleteTask taskId={deleteModalTaskId} setTaskId={setDeleteModalTaskId} deleteTask = {deleteTask}/>
      </div>
    </div>
  );
};

export default TaskList;
