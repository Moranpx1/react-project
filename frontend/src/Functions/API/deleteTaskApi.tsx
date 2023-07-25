import axios from "axios";

const deleteTaskApi = (taskId: string) => {
    return (
        axios
        .delete(
          `http://localhost:3000/api/tasks/${taskId}`,
          {
            withCredentials: true,
          }
        )
    );
};

export default deleteTaskApi;