import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Task from "../Interfaces/Task";
import { TasksContext } from "../../contexts/tasks";

const CreateTask = (props: any) => {
  const trigger = props.trigger;
  const setTrigger = props.setTrigger;
  const save = props.save;

  //Set values
  const [taskId, setTaskId] = useState("");
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadLine] = useState("");
  const [status, setStatus] = useState("base");

  //Context
  const {tasks, setTasks} = useContext(TasksContext);

  //Generate ID
  const generateTaskId = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  //Errors useStates
  const [taskNameError, setTaskNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [deadlineError, setDeadlineError] = useState("");

  //Check if task name is taken
  useEffect(() => {
    if (taskName && tasks.some((task) => task.taskName === taskName)) {
      setTaskNameError("Task name is already taken");
    } else {
      setTaskNameError("");
    }
  }, [taskName, tasks]);

  //Handle save of task
  const handleSave = (event: any) => {
    event.preventDefault();
    //Errors
    if (!taskName) {
      setTaskNameError("Task name is required");
    }
    if (!description) {
      setDescriptionError("Description is required");
    }
    if (!deadline) {
      setDeadlineError("Deadline is required");
    }
    if ((taskName && description && deadline) && (!taskNameError)) {
      let taskObj: Task = {
        taskId: generateTaskId(),
        taskName: taskName,
        description: description,
        deadline: deadline,
        status: status,
      };
      console.log(taskObj);
      save(taskObj);
      //Update context
      setTasks([...tasks, taskObj]);
      emptyInputFields();
    }
  };

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
    } else if (name === "Deadline") {
      setDeadLine(value.replace(/^\s+/, ""));
      setDeadlineError("");
    }
  };

  //Empty input fields
  const emptyInputFields = () => {
        setTaskName("");
        setDescription("");
        setDeadLine("");
        //Empty errors
        setTaskNameError("");
        setDescriptionError("");
        setDeadlineError("");
  }

  return (
    <Modal isOpen={trigger}>
      <ModalHeader>Create Task</ModalHeader>
      <ModalBody>
        <form>
          <div className="form-group">
            <label>Task Name</label>
            <input
              type="text"
              className="fullWidth"
              value={taskName}
              onChange={handleChange}
              name="taskName"
              required
            ></input>
            <div className = "commentText">Characters left: {10 - taskName.length}</div>
            <div className="visibleErrorText">{taskNameError}</div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              rows={5}
              className="fullWidth"
              value={description}
              onChange={handleChange}
              name="description"
              required
            ></textarea>
              <span className = "commentText">Characters left: {64 - description.length}</span>
              <div className="visibleErrorText">{descriptionError}</div>
         </div>
          <div className="form-group">
            <label>Deadline</label> 
            <br />
            <input  
              type="date"
              value={deadline}
              onChange={handleChange}
              name="Deadline"
              required
            ></input>
            <div className="visibleErrorText">{deadlineError}</div>
          </div>
          <ModalFooter>
            <Button type="submit" color="info text-white" onClick = {() => {handleSave(event)}}>
              Create
            </Button>{" "}
            <Button color="secondary" onClick = {() => {setTrigger(false); emptyInputFields()}}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default CreateTask;
