import "./AddTaskDialog.css";

import { useRef } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { CSSTransition } from "react-transition-group";
import { v4 } from "uuid";

import { LoaderIcon } from "../assets";
import { useAddTask } from "../hooks/data/use-add-task";
import Button from "./Button";
import Input from "./Input";
import TimeSelect from "./TimeSelect";

const AddTaskDialog = ({ isOpen, handleDialogClose }) => {
  const { mutate: addTask } = useAddTask();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm();

  const nodeRef = useRef();

  const handleSaveClick = async (data) => {
    const task = {
      id: v4(),
      title: data.title.trim(),
      time: data.time,
      description: data.description.trim(),
      status: "not_started",
    };
    addTask(task, {
      onSuccess: () => {
        handleDialogClose();
        reset({
          title: "",
          time: "morning",
          description: "",
          status: "not_started",
        });
      },
    });
  };

  const handleCancelClick = () => {
    handleDialogClose();
    reset();
  };
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div>
        {createPortal(
          <form onSubmit={handleSubmit(handleSaveClick)}>
            <div
              ref={nodeRef}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-xs"
            >
              <div className="w-full max-w-sm rounded-xl bg-white p-5">
                <h2 className="text-brand-dark-blue text-center text-xl font-semibold">
                  Nova Tarefa
                </h2>
                <p className="text-brand-text-gray mt-1 mb-4 text-center">
                  Insira as informações abaixo
                </p>
                <div className="flex flex-col space-y-4">
                  <Input
                    id="title"
                    label="Título"
                    placeholder="Título da tarefa"
                    disabled={isSubmitting}
                    errorMessage={errors?.title?.message}
                    {...register("title", {
                      required: "O título é obrigatório!",
                      validate: (value) => {
                        if (value.trim().length === 0) {
                          return "O título não pode ser vazio!";
                        }
                      },
                    })}
                  />

                  <TimeSelect
                    id="time"
                    disabled={isSubmitting}
                    errorMessage={errors?.time?.message}
                    {...register("time", {
                      required: "O horário é obrigatório!",
                    })}
                  />

                  <Input
                    id="description"
                    label="Descrição"
                    placeholder="Descreva sua tarefa"
                    disabled={isSubmitting}
                    errorMessage={errors?.description?.message}
                    {...register("description", {
                      required: "A descrição é obrigatória!",
                      validate: (value) => {
                        if (value.trim().length === 0) {
                          return "A descrição não pode ser vazia!";
                        }
                      },
                    })}
                  />
                </div>
                <div className="mt-4 flex gap-3">
                  <Button
                    onClick={handleCancelClick}
                    color="secondary"
                    className="w-full"
                    size="large"
                    type="button"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                    size="large"
                  >
                    {isSubmitting && (
                      <LoaderIcon className="text-brand-light-gray animate-spin" />
                    )}
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          </form>,
          document.body
        )}
      </div>
    </CSSTransition>
  );
};

export default AddTaskDialog;
