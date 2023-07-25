import React, { useState, useContext, useEffect } from "react";
import "../assets/css/App.css"
import "bootstrap/dist/css/bootstrap.min.css";
import CreateTask from "./Popups/CreateTask";
import DeleteTask from "./Popups/DeleteTask";
import NavBar from "./NavBar";
import Task from "../Interfaces/Task";
import Card from "./Card";
import { TasksContext } from "../contexts/tasks";
import { UserNameContext } from "../contexts/userName";
import updateTaskApi from "../Functions/API/updateTaskApi";
import getTasksApi from "../Functions/API/getTasksApi";

const TaskList = () => {

  // Modals
  const [toggleCreateModal, setToggleCreateModal] = useState(false);
  const [deleteModalTaskId, setDeleteModalTaskId] = useState("");

  //Context
  const { tasks, setTasks } = useContext(TasksContext);
  const { userName } = useContext(UserNameContext);

  //Search Query
  const [searchQuery, setSearchQuery] = useState("");

  //Filter tasks
  const [filteredTasks, setFilteredTasks] = useState(tasks)

  useEffect(() => {
    const filtered = tasks.filter((task) =>
      task.task.toLowerCase().includes(searchQuery.toLowerCase()))
    setFilteredTasks(filtered)
  }, [searchQuery])

  // Fetch tasks for a specific user using Axios
  useEffect(() => {
    const fetchUserTasks = async () => {
      try {
        const response = await getTasksApi(userName)
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching user's tasks:", error);
      }
    };
    fetchUserTasks();
  }, []);


  //Open Create Task Modal
  const openCreateModal = () => {
    setToggleCreateModal(true);
  };

  // Save Task
  const saveTask = (taskObj: Task) => {
    const newTask = { ...taskObj };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setToggleCreateModal(false);
  };

  // Delete Task
  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.task_id !== taskId)
    );
  };

  //Update List Array
  const updateListArray = (taskObj: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.task_id === taskObj.task_id ? taskObj : task))
    );
  };
  

  // Change Task Status
  const changeTaskStatus = (taskObj: Task) => {
    updateListArray(taskObj)
    //API
    updateTaskApi(taskObj)
  };

  return (
    <div className="task-screen">
      <NavBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        openCreateModal={openCreateModal}
      />
      <div>
        <div className="task-container">

          {searchQuery != "" ? 
            (filteredTasks.map((task) => (
              <Card
                key={task.task}
                taskObj={task}
                deleteModal={setDeleteModalTaskId}
                updateListArray={updateListArray}
                changeTaskStatus={changeTaskStatus}
              />))) :  
              (tasks.map((task) => (
                <Card
                  key={task.task}
                  taskObj={task}
                  deleteModal={setDeleteModalTaskId}
                  updateListArray={updateListArray}
                  changeTaskStatus={changeTaskStatus}
                />)))
            }
            
        </div>
        <CreateTask
          trigger={toggleCreateModal}
          setTrigger={setToggleCreateModal}
          save={saveTask}
        />
        <DeleteTask
          taskId={deleteModalTaskId}
          setTaskId={setDeleteModalTaskId}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
};

export default TaskList;
