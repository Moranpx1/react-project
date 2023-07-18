import React from "react";
import Task from "../Interfaces/Task";

const isInDeadline = (taskObj: Task) => {
  const currentDate = new Date();
  const currentDateString = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

  const deadlineDateString = `${taskObj.deadline[0]} ${taskObj.deadline[1]}`;

  if (Date.parse(currentDateString) > Date.parse(deadlineDateString)) {
    return false;
  }

  return true;
};

export default isInDeadline;
