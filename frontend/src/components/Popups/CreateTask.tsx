import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Task from "../../Interfaces/Task";
import { TasksContext } from "../../contexts/tasks";
import "bootstrap/dist/css/bootstrap.min.css";
import createTaskApi from "../../Functions/API/createTaskApi";

const CreateTask = (props: any) => {
  const trigger = props.trigger;
  const setTrigger = props.setTrigger;
  const save = props.save;

  //Set values
  const [task_id, setTaskId] = useState("");
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [hour, setHour] = useState("");
  const [status, setStatus] = useState("base");

  //Context
  const { tasks, setTasks } = useContext(TasksContext);

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
    if (taskName && tasks.some((task) => task.task === taskName)) {
      setTaskNameError("Task name is already taken");
    } else {
      setTaskNameError("");
    }
  }, [taskName, tasks]);

  //Handle save of task
  const handleSave = (event: any) => {
    event.preventDefault();
    //Errors
    let isFailed = false
    if (!taskName) {
      setTaskNameError("Task name is required");
      isFailed = true;
    }
    if (!description) {
      setDescriptionError("Description is required");
      isFailed = true;
    }
    if (!hour) {
      setDeadlineError("Deadline is required");
      isFailed = true;
    }
    if (!isFailed && !taskNameError) {
      //API
      createTaskApi(taskName, description, hour, status)
        .then((response) => {
          console.log("success");
          //Save task
          const taskObj: Task = {
            task_id: response.data.task.task_id,
            task: taskName,
            description: description,
            end_time: hour,
            status: status,
          };
          console.log("Created new task: " + taskObj);
          save(taskObj);
          //Update context
          setTasks([...tasks, taskObj]);
          emptyInputFields();
        })
        .catch((error) => {
          console.log("failed to create a new task");
        });
    }
  };

  //Handle change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "taskName") {
      const trimmedValue = value.slice(0, 10);
      setTaskName(trimmedValue.replace(/^\s+/, ""));
      setTaskNameError("");
    } else if (name === "description") {
      const trimmedValue = value.slice(0, 64);
      setDescription(trimmedValue.replace(/^\s+/, ""));
      setDescriptionError("");
    } else if (name === "hour") {
      setHour(value);
      setDeadlineError("");
    }
  };

  //Empty input fields
  const emptyInputFields = () => {
    setTaskName("");
    setDescription("");
    setHour("");
    //Empty errors
    setTaskNameError("");
    setDescriptionError("");
    setDeadlineError("");
  };

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
            <div className="commentText">
              Characters left: {10 - taskName.length}
            </div>
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
            <span className="commentText">
              Characters left: {64 - description.length}
            </span>
            <div className="visibleErrorText">{descriptionError}</div>
          </div>
          <div className="form-group">
            <label>Deadline</label>
            <br />
            <input
              type="time"
              step="1"
              value={hour}
              onChange={handleChange}
              name="hour"
              required
            ></input>
            <div className="visibleErrorText">{deadlineError}</div>
          </div>
          <ModalFooter>
            <Button
              type="submit"
              color="info text-white"
              onClick={() => {
                handleSave(event);
              }}
            >
              Create
            </Button>{" "}
            <Button
              color="secondary"
              onClick={() => {
                setTrigger(false);
                emptyInputFields();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default CreateTask;
