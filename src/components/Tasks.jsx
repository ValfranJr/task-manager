
import { CloudSunIcon, MoonIcon, SunIcon } from "../assets";
import { useGetTasks } from "../hooks/data/use-get-tasks";
import Header from "./Header";
import TaskItem from "./TaskItem";
import TasksSeparator from "./TasksSeparator";

const Tasks = () => {

  const { data: tasks } = useGetTasks();

  const morningTasks = tasks?.filter((task) => task.time === "morning");
  const afternoonTasks = tasks?.filter((task) => task.time === "afternoon");
  const nightTasks = tasks?.filter((task) => task.time === "night");



  return (
    <div className="w-full space-y-6 px-8 py-16">
      {/* Titulo com Botão */}
      <Header title="Minhas Tarefas" subtitle="Minhas Tarefas" />
      {/* Tarefas */}
      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator title="Manhã" icon={<SunIcon />} />
          {morningTasks?.length === 0 && (
            <div className="text-brand-text-gray text-center">
              Não há tarefas cadastradas para o período da manhã
            </div>
          )}
          {morningTasks?.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              index={index}
            />
          ))}
        </div>
        <div className="my-6 space-y-3">
          <TasksSeparator
            title="Tarde"
            icon={<CloudSunIcon className="text-brand-dark-blue" />}
          />
          {afternoonTasks?.length === 0 && (
            <div className="text-brand-text-gray text-center">
              Não há tarefas cadastradas para o período da tarde
            </div>
          )}
          {afternoonTasks?.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              index={index}
            />
          ))}
        </div>
        <div className="space-y-3">
          <TasksSeparator title="Noite" icon={<MoonIcon />} />
          {nightTasks?.length === 0 && (
            <div className="text-brand-text-gray text-center">
              Não há tarefas cadastradas para o período da noite
            </div>
          )}
          {nightTasks?.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Tasks;
