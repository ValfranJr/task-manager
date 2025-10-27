import { Link } from "react-router-dom";
import { toast } from "sonner";

import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from "../assets";
import { useDeleteTask } from "../hooks/data/use-delete-task";
import { useUpdateTask } from "../hooks/data/use-update-task";
import Button from "./Button";

const TaskItem = ({ task }) => {
  const { mutate: deleteTask, isPending: deleteIsLoading } = useDeleteTask(
    task.id
  );

  const handleDeleteClick = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success("Tarefa removida com sucesso!");
      },
      onError: () => {
        toast.error("Ocorreu um erro ao remover a tarefa!");
      },
    });
  };
  const { mutate: updateTask } = useUpdateTask(task.id);
  const getStatusClasses = () => {
    if (task.status === "done") {
      return "bg-[rgba(0,173,181,0.1)] text-brand-primary";
    }
    if (task.status === "in_progress") {
      return "bg-[rgba(255,170,4,0.1)] text-brand-process";
    }
    if (task.status === "not_started") {
      return "bg-[rgba(53,56,62,0.1)] text-brand-dark-blue";
    }
  };

  const getCheckboxClasses = () => {
    if (task.status === "done") {
      return "bg-brand-primary text-white"; // 100% da cor quando checked
    }
    if (task.status === "in_progress") {
      return "bg-brand-process text-brand-process";
    }
    if (task.status === "not_started") {
      return "bg-[rgba(53,56,62,0.1)] text-brand-dark-blue";
    }
  };

  const getNewStatus = () => {
    if (task.status === "not_started") {
      return "in_progress";
    }
    if (task.status === "in_progress") {
      return "done";
    }
    if (task.status === "done") {
      return "not_started";
    }
  };

  const handleCheckboxClick = () => {
    updateTask(
      {
        status: getNewStatus(),
      },
      {
        onSuccess: () => {
          toast.success("Tarefa atualizada com sucesso!");
        },
        onError: () => {
          toast.error("Ocorreu um erro ao atualizar a tarefa!");
        },
      }
    );
  };
  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg px-4 py-3 text-sm transition ${getStatusClasses()}`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getCheckboxClasses()}`}
        >
          <input
            type="checkbox"
            checked={task.status === "done"}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={handleCheckboxClick}
          />
          {task.status === "done" && <CheckIcon />}
          {task.status === "in_progress" && (
            <LoaderIcon className="animate-spin text-white" />
          )}
        </label>
        <p>{task.title}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          color="ghost"
          onClick={handleDeleteClick}
          disabled={deleteIsLoading}
        >
          {deleteIsLoading ? (
            <LoaderIcon className="text-brand-text-gray animate-spin" />
          ) : (
            <TrashIcon className="text-red-300" />
          )}
        </Button>

        <Link to={`/tasks/${task.id}`}>
          <DetailsIcon />
        </Link>
      </div>
    </div>
  );
};

export default TaskItem;
