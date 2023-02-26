import Box from "../../Basic/Box";
import Button from "../../Basic/Button";
import Input from "../../Basic/Input";
import Text from "../../Basic/Text";
import { useSetRecoilState } from 'recoil'
import taskInterface from "../../../interfaces/tasks";
import tasksState from "../../../Atoms/tasksState";
import { useState } from "react";
import { v4 as uuid } from "uuid";

enum Time {
  hour = 0,
  minute = 1,
  second = 2
}

const Form = () => {

  const setTasks = useSetRecoilState<taskInterface[]>(tasksState)
  const [nameTask, setNameTask] = useState<string>('')
  const [timeTask, setTimeTask] = useState<string[]>(['', '', ''])
  const [describerTask, setDescriberTask] = useState<string>('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const time = formatTime(timeTask)

    const task = {
      id: uuid(),
      title: nameTask,
      describer: describerTask ?? '',
      time,
      selected: false,
      complete: false,
      defaultTime: time
    } as taskInterface

    setTasks(tasks => [...tasks, task])
    setNameTask('')
    setTimeTask(['', '', ''])
  }

  function formatTime(timeToFormat: Array<string>) {
    // Split the input string into hours, minutes, and seconds
    const parts = timeToFormat
    // Calculate the total number of seconds
    const seconds = (+parts[0]) * 60 * 60 + (+parts[1]) * 60 + (+parts[2]);
    // Calculate the number of minutes and seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    // Return the result in the format "mm:ss"
    const result = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;

    if (result.length === 4) return '0'.concat(result)

    return result
  }

  const handleTimeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const type = Time[event.target.name as keyof typeof Time]

    setTimeTask((prevTimeTask) => {
      const newTimeTask = [...prevTimeTask]
      newTimeTask[type] = event.target.value
        .replace(/(\d{2})\d+?/, '$1')

      return newTimeTask
    })
  }

  return (
    <Box className={` bg-secondary w-11/12 p-3`}>
      <form onSubmit={handleSubmit} className='grid gap-y-4 grid-cols-16 grid-rows-2'>
        <div className="row-start-1 col-span-7">
          <Text type='p' className='mb-3 text-xl'>Title task</Text>
          <Input
            className='text-xl w-full'
            type="text"
            placeholder='What you want note?'
            onChange={event => setNameTask(event.target.value)}
            value={nameTask}
            maxLength={51}
            required
          />
        </div>
        <div className="col-span-8 col-start-9">
          <Text type='p' className='mb-3  text-xl'>Describer</Text>
          <Input
            className='text-xl w-full'
            type="text"
            placeholder='describer more about the task...'
            onChange={event => setDescriberTask(event.target.value)}
            value={describerTask}
            maxLength={51}
          />
        </div>
        <div className="col-start-1 col-span-10">
          <Text type='p' className='mb-3 text-xl'>Timer</Text>
          <div className='grid grid-cols-16 items-center'>
            <Input
              className='col-span-4  self-center h-14'
              type="number" name="hour" id="hour" step='1' placeholder='Hours'
              min={0} max={24}
              onChange={handleTimeInput}
              value={timeTask[0]}
            />
            <span className='justify-self-center item-self-center text-xl text-colorText'>:</span>
            <Input
              className='col-span-5 self-center h-14'
              type="number" name="minute" id="minutes" placeholder='minutes' step='1'
              min={0} max={59}
              onChange={handleTimeInput}
              value={timeTask[1]}
            />
            <span className='justify-self-center item-self-center text-xl text-colorText'>:</span>
            <Input
              className='col-span-5 self-center h-14'
              type="number" name="second" id="seconds" placeholder='seconds' step='1'
              min={0} max={59}
              onChange={handleTimeInput}
              value={timeTask[2]}
              required={timeTask[0] || timeTask[0] ? false : true}
            />
          </div>
        </div>
        <Button
          className="col-start-12 col-span-4 self-end"
          type="submit"
        >To add</Button>
      </form>
    </Box >
  )
}

export default Form;