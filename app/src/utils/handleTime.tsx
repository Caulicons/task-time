import { useRecoilState } from "recoil";
import { selectedTask } from "../Atoms/tasksState";
import taskInterface from "../interfaces/tasks";
const [taskToShow, setCompleteTask] = useRecoilState<taskInterface>(selectedTask)

const handleTime = {
  start: () => {
    const time = taskToShow?.time
    countdown(time)
  },
  stop: () => {

  }
}

function decreaseTime(timeString: string) {
  // Convert the time string into total seconds
  const [minutes, seconds] = timeString.split(":").map(Number);
  const totalSeconds = minutes * 60 + seconds;

  // Decrease the time by 1 second
  const newTotalSeconds = totalSeconds - 1;

  // Convert the total seconds back to the "mm:ss" format
  const newMinutes = Math.floor(newTotalSeconds / 60);
  const newSeconds = newTotalSeconds % 60;
  const newTimeString = `${newMinutes.toString().padStart(2, "0")}:${newSeconds.toString().padStart(2, "0")}`;

  // Return the new time string
  return newTimeString;
}

function countdown(timeString: string) {

  if (timeString === "00:00") return

  const intervalId = setInterval(() => {

    timeString = decreaseTime(timeString);
    setCompleteTask({ ...taskToShow, time: timeString })
    if (timeString === "00:00") {
      setCompleteTask({ ...taskToShow, time: timeString })
      clearInterval(intervalId);
    }
  }, 1000);
}

export default handleTime;