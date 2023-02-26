import Button from "../../Basic/Button";
import Text from "../../Basic/Text";
import Box from "../../Basic/Box";
import NumberClock from "./NumberClock";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { finishedTasks, runTasks, selectedTask } from "../../../Atoms/tasksState";
import taskInterface from "../../../interfaces/tasks";
import { getRecoil, setRecoil } from 'recoil-nexus'

let intervalId: ReturnType<typeof setInterval>

const Clock = () => {

  const taskToShow = useRecoilValue(selectedTask) as taskInterface
  const runTask = useSetRecoilState(runTasks(taskToShow?.id))
  const finishedTask = useSetRecoilState(finishedTasks(taskToShow?.id))

  const taskTime = taskToShow?.time.split('')

  const handleStart = () => {

    const time = taskToShow?.time
    countdown(time)
  }

  const handleStop = () => {

    clearInterval(intervalId)
  }

  function decreaseTime(timeString: string) {
    if (timeString === "00:00") return timeString
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

    runTask({ ...taskToShow, time: timeString })

    intervalId = setInterval(() => {

      const taskRunning = getRecoil(selectedTask) as taskInterface

      if (!taskRunning) {
        finishedTask(taskRunning)
        clearInterval(intervalId)
        return  
      };

      if (!taskRunning.isRunning) {
        finishedTask({ ...taskToShow, time: timeString })
        clearInterval(intervalId);
        return
      }

      if (timeString === "00:00") {
        
        finishedTask({ ...taskToShow, time: timeString })
        clearInterval(intervalId);
        return
      }

      timeString = decreaseTime(timeString);
      runTask({ ...taskToShow, time: timeString })
    }, 1000);
  }

  return (
    <>
      <Text type="p" className='font-semibold mt-8 text-2xl'>{
        taskToShow?.isRunning ? "task started" : "To start time choice a lesson"
      }</Text>
      <Box className='bg-secondary  w-11/12'>
        <div className='flex gap-1 p-3 w-full '>
          {taskTime ?
            taskTime.map((str) => {

              if (str === ':') {
                return <span key={Math.random()} className='text-colorText text-9xl'>:</span>
              }
              return <NumberClock key={Math.random()} number={str} />
            })
            :
            <>
              <NumberClock />
              <NumberClock />
              <span className='text-colorText text-9xl'>:</span>
              <NumberClock />
              <NumberClock />
            </>
          }
        </div>
      </Box>
      <div className="mt-5 flex gap-4">
        <Button onClick={handleStart} disabled={taskToShow ? false : true}>Start</Button>
        <Button onClick={handleStop} >Stop</Button>

      </div>
    </>
  )
}

export default Clock;