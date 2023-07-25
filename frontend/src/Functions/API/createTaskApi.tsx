import axios from "axios"; 

const createTaskApi = (taskName: string, description: string, hour: string, status: string) => {
    return (
        axios
        .post(
          "http://localhost:3000/api/tasks",
          {
            task: taskName,
            description: description,
            status: status,
            end_time: hour,
          },
          {
            withCredentials: true,
          }
        )
    );
};

export default createTaskApi;