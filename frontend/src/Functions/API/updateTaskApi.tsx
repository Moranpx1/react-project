import {useContext} from 'react';
import axios from 'axios';
import Task from '../../Interfaces/Task';
import { TasksContext } from "../../contexts/tasks";

const updateTaskApi = (taskObj: Task) => {
    return (axios
    .put(
      `http://localhost:3000/api/tasks/${taskObj.task_id}`,
      {
        task: taskObj.task,
        description: taskObj.description,
        status: taskObj.status,
        end_time: taskObj.end_time,
      },
      {
        withCredentials: true,
      }
    ))
}

export default updateTaskApi;