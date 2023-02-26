import { atom, DefaultValue, selectorFamily, selector, SerializableParam } from 'recoil'
import taskInterface from '../interfaces/tasks';
import { v4 as uuidv4 } from 'uuid';

const tasksState = atom({
  key: 'tasks',
  default: [
    {
      id: uuidv4(),
      title: 'He is a task',
      describer: 'On right, you can delete and restart',
      time: '00:03',
      selected: false,
      isRunning: false,
      complete: false,
      defaultTime: '00:03'
    },
  ] as taskInterface[]
});

export const isTaskSelected = selectorFamily({
  key: 'isTaskSelected',
  get: (taskID: string) => ({ get }): boolean | undefined => {
    const isSelected = get(tasksState).find(task => task.id === taskID)?.selected
    return isSelected
  }
})

export const selectedTask = selector({
  key: 'selectedTask',
  get: ({ get }): taskInterface => {
    const tasksSelected = get(tasksState).find(task => task.selected)
    return tasksSelected as taskInterface
  },
  set: ({ get, set }, taskID: DefaultValue | taskInterface | string) => {

    const newTasks = get(tasksState).map(task => {
      const id = taskID as string

      if (task.id !== id) {
        return { ...task, selected: false, isRunning: false };
      } else {
        return { ...task, selected: !task.selected };
      }
    })

    set(tasksState, newTasks)
  }
})

export const runTasks = selectorFamily({
  key: 'runTask',
  get: (taskID: string) => ({ get }) => {
    const isCompleteTask = get(tasksState).find(task => task.id === taskID)
    return isCompleteTask?.isRunning
  },
  set: () => ({ get, set }, updatedTask: any) => {
    const updateTasks = get(tasksState).map(task => {
      if (task.id !== updatedTask.id) return task

      if (!task.selected) return { ...task, isRunning: false }

      if (task.time === '00:00') return { ...updatedTask, complete: true, isRunning: false }

      return { ...updatedTask, isRunning: true }
    })
    set(tasksState, updateTasks)
  }
})



export const finishedTasks = selectorFamily({
  key: 'finishedTask',
  get: (taskID: string) => ({ get }) => {
    const isCompleteTask = get(tasksState).find(task => task.id === taskID)
    return isCompleteTask?.complete
  },
  set: () => ({ get, set }, updatedTask: any) => {
    if (!updatedTask) return

    const updateTasks = get(tasksState).map(task => {
      if (task.id !== updatedTask.id) return task

      if (task.time === '00:00') return { ...updatedTask, selected: false, complete: true, isRunning: false }

      return { ...updatedTask, selected: false, isRunning: false }
    })
    set(tasksState, updateTasks)
  }
})

export const restaureTask = selector<taskInterface | null | string | DefaultValue>({
  key: 'restaureTask',
  get: () => { return null },
  set: ({ get, set }, taskID) => {

    const handleID = taskID as string

    const newArrTask = get(tasksState).map(task => {
      if (task.id !== handleID) return task

      return { ...task, time: task.defaultTime, complete: false, isRunning: false, selected: false }
    })

    set(tasksState, newArrTask)
  }
})

export const taskDeleted = selector<taskInterface | null | string>({
  key: 'taskedDeleted',
  get: () => { return null },
  set: ({ get, set }, taskID) => {

    const handleID = taskID as string
    const newArrTask = get(tasksState).filter(task => task.id !== handleID) as taskInterface[]

    set(tasksState, newArrTask)
  }
})




export default tasksState;

