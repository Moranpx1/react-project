import React from "react";
import Task from "../Interfaces/Task";
import timeToSeconds from "./timeToSeconds";

const isInDeadline = (taskObj: Task) => {
  const currentDate = new Date();

  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  const currentSeconds = currentDate.getSeconds();

  const deadline = taskObj.end_time;

  const [deadlineHours, deadlineMinutes, deadlineSeconds] = deadline.split(":");

  const deadlineInSeconds = timeToSeconds(parseInt(deadlineHours), parseInt(deadlineMinutes), parseInt(deadlineSeconds))

  const currentInSeconds = timeToSeconds(currentHours, currentMinutes, currentSeconds);

  return(!(currentInSeconds > deadlineInSeconds))
};

export default isInDeadline;
