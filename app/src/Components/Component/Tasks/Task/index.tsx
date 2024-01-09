import Text from "../../../Basic/Text";
import { ReactComponent as CheckSVG } from "../../../../assets/check.svg";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  finishedTasks,
  isTaskSelected,
  selectedTask,
} from "../../../../Atoms/tasksState";
import taskInterface from "../../../../interfaces/tasks";

type taskProps = React.ComponentProps<"div"> & taskInterface;

const Task = ({ id, title, time, describer, ...props }: taskProps) => {
  const isComplete = useRecoilValue(finishedTasks(id));

  const isSelected = useRecoilValue<boolean | undefined>(
    isTaskSelected(id)
  ) as boolean;
  const setSelectTask = useSetRecoilState(selectedTask);

  return (
    <div
      className={`
    h-24  rounded-md py-2 justify-between items-center px-4 
    ${isComplete ? "bg-green-300" : isSelected ? "bg-indigo-400" : "bg-primary"}
      h-fit
      w-full
      flex
    ${props.className}`}
      onClick={() => setSelectTask({ id, title, time, describer, ...props })}
    >
      <div className="w-full">
        <Text
          type="p"
          className=" break-word font-bold text-xl text-slate-900 underline underline-offset-2 w-full decoration-secondary"
        >
          {title}
        </Text>
        <Text
          type="p"
          className=" break-word font-semibold text-xl text-slate-900  w-full decoration-secondary"
        >
          {describer}
        </Text>
        <div className="flex justify-between w-full">
          <Text type="p" className="mt-2 font-bold text-xl text-slate-900">
            {time === "00:00" ? "finished !" : time}
          </Text>
          {isComplete && <CheckSVG className="h-12 w-12" />}
        </div>
      </div>
    </div>
  );
};

export default Task;
