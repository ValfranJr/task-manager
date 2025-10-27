import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { LoaderIcon, TrashIcon } from "../assets";
import { ButtonLeftIcon, ChevronRightIcon } from "../assets";
import Button from "../components/Button";
import Input from "../components/Input";
import SideBar from "../components/SideBar";
import TimeSelect from "../components/TimeSelect";
import { useDeleteTask } from "../hooks/data/use-delete-task";
import { useGetTask } from "../hooks/data/use-get-task";
import { useUpdateTask } from "../hooks/data/use-update-task";

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { mutate: updateTask, isPending: updateTaskIsLoading } =
    useUpdateTask(taskId);

  const { mutate: deleteTask, isPending: deleteTaskIsLoading } =
    useDeleteTask(taskId);

  const { data: task } = useGetTask({taskId, onSuccess: (task) => reset(task)});

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleDeleteClick = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success("Tarefa deletada com sucesso!");
        navigate(-1);
      },
      onError: () => toast.error("Ocorreu um erro ao deletar tarefa!"),
    });
  };

  const handleSaveClick = async (data) => {
    updateTask(data, {
      onSuccess: () => toast.success("Tarefa atualizada com sucesso!"),
      onError: () => toast.error("Ocorreu um erro ao atualizar tarefa!"),
    });
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="w-full space-y-6 px-8 py-8">
        {/* barra de navegação */}
        <div className="flex w-full justify-between">
          {/* parte esquerda */}
          <div>
            <Button
              onClick={handleGoBack}
              className="mb-4 rounded-4xl px-3 py-3"
            >
              <ButtonLeftIcon className="text-white" />
            </Button>
            <div className="flex items-center gap-1 text-sm">
              <Link className="text-brand-text-gray" onClick={handleGoBack}>
                Minhas Tarefas
              </Link>
              <ChevronRightIcon className="text-brand-text-gray h-[0.75rem] w-[0.75rem]" />
              <span className="text-brand-primary font-semibold">
                {task?.title}
              </span>
            </div>
          </div>
        </div>
        {/* parte direita */}
        <div className="flex w-full justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{task?.title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleDeleteClick}
              className="bg-brand-danger"
              disabled={updateTaskIsLoading || deleteTaskIsLoading}
            >
              <TrashIcon />
              Deletar Tarefa
            </Button>
          </div>
        </div>
        <form onSubmit={handleSubmit(handleSaveClick)}>
          <div className="bg-brand-white space-y-6 rounded-xl">
            <div>
              <Input
                label="Nome"
                disabled={updateTaskIsLoading || deleteTaskIsLoading}
                {...register("title", {
                  required: "O título é obrigatório!",
                  validate: (value) => {
                    if (value.trim().length === 0) {
                      return "O título não pode ser vazio!";
                    }
                  },
                })}
                errorMessage={errors?.title?.message}
              />
            </div>
            <div>
              <TimeSelect
                disabled={updateTaskIsLoading || deleteTaskIsLoading}
                {...register("time", {
                  required: "O horário é obrigatório!",
                })}
                errorMessage={errors?.time?.message}
              />
            </div>
            <div>
              <Input
                label="Descrição"
                disabled={updateTaskIsLoading || deleteTaskIsLoading}
                {...register("description", {
                  required: "A descrição é obrigatória!",
                  validate: (value) => {
                    if (value.trim().length === 0) {
                      return "A descrição não pode ser vazia!";
                    }
                  },
                })}
                errorMessage={errors?.description?.message}
              />
            </div>
          </div>
          <div className="mt-6 flex w-full justify-end gap-3">
            <Button onClick={handleGoBack} size="large" color="secondary">
              Cancelar
            </Button>
            <Button
              type="submit"
              size="large"
              color="primary"
              disabled={updateTaskIsLoading || deleteTaskIsLoading}
            >
              {(updateTaskIsLoading || deleteTaskIsLoading) && (
                <LoaderIcon className="text-brand-light-gray animate-spin" />
              )}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
