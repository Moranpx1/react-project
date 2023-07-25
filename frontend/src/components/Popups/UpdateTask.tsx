import React, {
  ReactEventHandler,
  useEffect,
  useState,
  useContext,
} from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Task from "../../Interfaces/Task";
import { TasksContext } from "../../contexts/tasks";
import axios from "axios";
import updateTaskApi from "../../Functions/API/updateTaskApi";

interface UpdateTaskProps {
  trigger: boolean;
  setTrigger: (bool: boolean) => void;
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
  const [taskName, setTaskName] = useState(taskObj.task);
  const [description, setDescription] = useState(taskObj.description);
  const [hour, setHour] = useState(taskObj.end_time);

  //Context
  const { tasks, setTasks } = useContext(TasksContext);

  //Errors useStates
  const [taskNameError, setTaskNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [deadlineError, setDeadlineError] = useState("");


  //Check if task name is taken
  useEffect(() => {
    if (taskName && tasks.some((task) => task.task === taskName)) {
      //Check if the similar name is the name of the current task (In which case it is fine)
      if (taskName !== taskObj.task) {
        setTaskNameError("Task name is already taken");
      }
    } else {
      setTaskNameError("");
    }
  }, [taskName, tasks]);

  //Handle changes
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const trimmedValue = e.target.value.slice(0, 10);
      setTaskName(trimmedValue.replace(/^\s+/, ""));
      setTaskNameError("");
  }
  
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const trimmedValue = e.target.value.slice(0, 64);
    setDescription(trimmedValue.replace(/^\s+/, ""));
    setDescriptionError("");
  }

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setHour(e.target.value);
    setDeadlineError("");
  }

  //Handle save of task
  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

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
      const updatedTask: Task = {
        task_id: taskObj.task_id,
        task: taskName,
        description: description,
        end_time: hour,
        status: taskObj.status,
      };
      updateTaskApi(updatedTask)
        .then((response) => {
          //updateTask defined in Card
          updateTask(updatedTask);
        })
        .catch((error) => {
          console.log("fail");
        });
    }
  };

  return (
    <Modal isOpen={trigger}>
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
              onChange={handleNameChange}
              name="taskName"
            ></input>
            <span className="commentText">
              Characters left: {10 - taskName.length}
            </span>
            <div className="visibleErrorText">{taskNameError}</div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              required
              rows={5}
              className="fullWidth"
              value={description}
              onChange={handleDescriptionChange}
              name="description"
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
              required
              type="time"
              step="1"
              value={hour}
              onChange={handleHourChange}
              name="hour"
            ></input>
            <div className="visibleErrorText">{deadlineError}</div>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button type="submit" color="info text-white" onClick={handleUpdate}>
          Update
        </Button>
        <Button color="secondary" onClick={() => setTrigger(false)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UpdateTask;
