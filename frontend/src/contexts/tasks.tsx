import React, { createContext, useState } from "react";
import Task from "../components/Interfaces/Task";

interface TasksContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const initialTasksContext: TasksContextType = {
  tasks: [],
  setTasks: () => {},
};

const TasksContext = createContext<TasksContextType>(initialTasksContext);

interface TasksProviderProps {
  children: React.ReactNode;
}

const TasksProvider: React.FC<TasksProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
};

export { TasksContext, TasksProvider };
