import React, { ReactEventHandler, useEffect, useState, useContext} from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Task from "../Interfaces/Task";
import {TasksContext} from "../../contexts/tasks";

interface UpdateTaskProps {
  trigger: boolean;
  setTrigger: (bool: boolean)=> void;
  taskObj: Task;
  updateTask: (obj: Task) => void;
}

const UpdateTask: React.FC<UpdateTaskProps> = ({
  trigger,
  setTrigger,
  taskObj,
  updateTask,
}) => {
  //Set values
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");

  //Context
  const {tasks, setTasks} = useContext(TasksContext);

  //Errors useStates
  const [taskNameError, setTaskNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [deadlineError, setDeadlineError] = useState("");

  //Check if task name is taken
  useEffect(() => {
    if (taskName && tasks.some((task) => task.taskName === taskName)) {
      //Check if the similar name is the name of the current task (In which case it is fine)
      if(taskName !== taskObj.taskName){
        setTaskNameError("Task name is already taken");
      }
    } else {
      setTaskNameError("");
    }
  }, [taskName, tasks]);

  //Handle change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "taskName") {
      const trimmedValue = value.slice(0, 10)
      setTaskName(trimmedValue.replace(/^\s+/, ""));
      setTaskNameError("");
    } else if (name === "description") {
      const trimmedValue = value.slice(0, 64)
      setDescription(trimmedValue.replace(/^\s+/, ""));
      setDescriptionError("");
    } else if (name === "day") {
      setDay(value);
      setDeadlineError("");
    } else if (name === "hour") {
      setHour(value);
      setDeadlineError("");
    }
  };

  //Filling input fields
  useEffect(() => {
    setTaskName(taskObj.taskName);
    setDescription(taskObj.description);
    setDay(taskObj.deadline[0]);
    setHour(taskObj.deadline[1]);
  }, []);

  //Handle save of task
  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
      //Errors
      if (!taskName) {
        setTaskNameError("Task name is required");
      }
      if (!description) {
        setDescriptionError("Description is required");
      }
      if (!day || !hour) {
        setDeadlineError("Deadline is required");
      }
    if ((taskName && description && day && hour) && (!taskNameError)) {  
      let updatedTask: Task = {
        taskId: taskObj.taskId,
        taskName: taskName,
        description: description,
        deadline: [day, hour],
        status: taskObj.status,
      };

    // Update the task in the context directly
    setTasks((tasks) =>
    tasks.map((task) => (task.taskId === updatedTask.taskId ? updatedTask : task))
    );

      //updateTask defined in Card
      updateTask(updatedTask);
    }
  };

  return(
    <Modal isOpen = {trigger}>
      <ModalHeader>Update Task</ModalHeader>
      <ModalBody>
        <form>
          <div className="form-group">
            <label>Task Name</label>
            <input
              required
              type="text"
              className="fullWidth"
              value={taskName}
              onChange={handleChange}
              name="taskName"
            ></input>
             <span className = "commentText">Characters left: {10 - taskName.length}</span>
             <div className="visibleErrorText">{taskNameError}</div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              required
              rows={5}
              className="fullWidth"
              value={description}
              onChange={handleChange}
              name="description"
            ></textarea>
              <span className = "commentText">Characters left: {64 - description.length}</span>
              <div className="visibleErrorText">{descriptionError}</div>
          </div>
          <div className="form-group">
            <label>Deadline</label>
            <br />
            <input
              required
              type="date"
              min={'2000-01-01'}
              max={'9000-01-01'}
              value={day}
              onChange={handleChange}
              name="day"
            ></input>
            <input
              required
              type="time"
              value={hour}
              onChange={handleChange}
              name="hour"
            ></input>
            <div className="visibleErrorText">{deadlineError}</div>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button type="submit" color="info text-white" onClick={handleUpdate}>
          Update
        </Button>{" "}
        <Button color="secondary" onClick={() => setTrigger(false)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
};

export default UpdateTask;
