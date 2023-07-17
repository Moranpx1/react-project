import React from "react";
import Task from "../Interfaces/Task";

const isInDeadline = (taskObj: Task) => {
  const currentDate = new Date();
  const deadlineDate = new Date(taskObj.deadline);

  if (currentDate > deadlineDate) {
    return false;
  }
  return true;
};

export default isInDeadline;
