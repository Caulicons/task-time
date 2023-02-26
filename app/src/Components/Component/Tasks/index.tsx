import Text from "../../Basic/Text";
import Task from "./Task";
import { useRecoilState } from 'recoil'
import taskInterface from "../../../interfaces/tasks";
import tasksState, { restaureTask, taskDeleted } from "../../../Atoms/tasksState";
import ResetTask from "./ResetTask";
import RemoveTask from "./RemoveTask/removeTask";
import { useSetRecoilState } from 'recoil';

const Tasks = () => {

  const [tasks] = useRecoilState<taskInterface[]>(tasksState);
  const removeTask = useSetRecoilState(taskDeleted)
  const resetTask = useSetRecoilState(restaureTask)

  return (
    <div className='grid gap-3 h-fit w-[18pc]'>
      <Text type="p" className='flex justify-center text-2xl'>Tasks of the day</Text>
      <div className='flex flex-col max-h-[500px] overflow-auto scrollbar'>
        {tasks.map((task, i) =>
          <div key={i} className="flex w-full mt-6">
            <Task {...task}></Task>
            <div className="flex flex-col justify-around">
              <RemoveTask onClick={() => removeTask(task.id)} />
              <ResetTask onClick={() => resetTask(task.id)} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Tasks;