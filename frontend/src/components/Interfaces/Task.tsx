interface Task {
    taskId: string;
    taskName: string;
    description: string;
    deadline: [string, string];
    status: string;
}

export default Task;