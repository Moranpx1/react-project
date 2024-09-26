import axios from "axios";

const getTasksApi = (userName: string) => {
    return(axios.get(
        `http://localhost:3000/api/users/${userName}/tasks`,
        {
          withCredentials: true,
        }
      ));
};

export default getTasksApi;