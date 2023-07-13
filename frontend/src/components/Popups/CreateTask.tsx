import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Task from "../Interfaces/Task";

const CreateTask = (props: any) => {
  const trigger = props.trigger;
  const setTrigger = props.setTrigger;
  const save = props.save;

  //Set values
  const [taskId, setTaskId] = useState("");
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("base");

  //Generate ID
  const generateTaskId = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  //Handle save of task
  const handleSave = () => {
    if (taskName && description && date) {
      let taskObj: Task = {
        taskId: generateTaskId(),
        taskName: taskName,
        description: description,
        date: date,
        status: status,
      };
      console.log(taskObj);
      save(taskObj);
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
    } else if (name === "description") {
      const trimmedValue = value.slice(0, 64)
      setDescription(trimmedValue.replace(/^\s+/, ""));
    } else if (name === "Deadline") {
      setDate(value.replace(/^\s+/, ""));
    }
  };

  //Empty input fields
  const emptyInputFields = () => {
        setTaskName("");
        setDescription("");
        setDate("");
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
            <span className = "commentText">Characters left: {10 - taskName.length}</span>
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
          </div>
          <div className="form-group">
            <label>Deadline</label>
            <br />
            <input
              type="date"
              value={date}
              onChange={handleChange}
              name="Deadline"
              required
            ></input>
          </div>
          <ModalFooter>
            <Button type="submit" color="info text-white" onClick = {() => {handleSave()}}>
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
