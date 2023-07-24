import React from "react";
import Task from "../Interfaces/Task";

const isInDeadline = (taskObj: Task) => {
  const currentDate = new Date();

  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  const currentSeconds = currentDate.getSeconds();

  const deadline = taskObj.end_time;

  const [deadlineHours, deadlineMinutes, deadlineSeconds] = deadline.split(":");

  const deadlineInSeconds =
    parseInt(deadlineHours) * 3600 +
    parseInt(deadlineMinutes) * 60 +
    parseInt(deadlineSeconds);
  const currentInSeconds =
    currentHours * 3600 + currentMinutes * 60 + currentSeconds;

  if (currentInSeconds > deadlineInSeconds) {
    return false;
  }
  return true;
};

export default isInDeadline;
