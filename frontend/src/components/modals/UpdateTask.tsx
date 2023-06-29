import React, { ReactEventHandler, useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Task from "../Interfaces/Task";

interface UpdateTaskProps {
  modal: boolean;
  toggle: () => void;
  taskObj: Task;
  updateTask: (obj: Task) => void;
}

const UpdateTask: React.FC<UpdateTaskProps> = ({
  modal,
  toggle,
  taskObj,
  updateTask,
}) => {
  //Set values
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  //Handle change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "taskName") {
      setTaskName(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "Deadline") {
      setDate(value);
    }
  };

  //Filling input fields
  useEffect(() => {
    setTaskName(taskObj.taskName);
    setDescription(taskObj.description);
    setDate(taskObj.date);
  }, []);

  //Handle save of task
  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let tempObj: Task = {
      taskId: taskObj.taskId,
      taskName: taskName,
      description: description,
      date: date,
      status: taskObj.status,
    };
    //updateTask defined in Card
    updateTask(tempObj);
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Update Task</ModalHeader>
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
          </div>
          <div className="form-group">
            <label>Deadline</label>
            <br />
            <input
              required
              type="date"
              value={date}
              onChange={handleChange}
              name="Deadline"
            ></input>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button type="submit" color="info text-white" onClick={handleUpdate}>
          Update
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UpdateTask;
