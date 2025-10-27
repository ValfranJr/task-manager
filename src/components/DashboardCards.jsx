import {
  GlassWaterIcon,
  LayoutListIcon,
  LoaderIcon,
  TasksIcon,
} from "../assets";
import { useGetTasks } from "../hooks/data/use-get-tasks";
import DashboardCard from "./DashboardCard";

const DashboardCards = () => {
  const { data: tasks } = useGetTasks();
  const inProgressTasks = tasks?.filter(
    (task) => task.status === "in_progress"
  ).length;
  const completedTasks = tasks?.filter((task) => task.status === "done").length;
  return (
    <div className="grid grid-cols-4 gap-9">
      <DashboardCard
        icon={<LayoutListIcon />}
        mainText={tasks?.length}
        subText="Tarefas Disponíveis"
      />
      <DashboardCard
        icon={<TasksIcon color="#00ADB5" />}
        mainText={completedTasks}
        subText="Tarefas Concluídas"
      />
      <DashboardCard
        icon={<LoaderIcon color="#00ADB5" />}
        mainText={inProgressTasks}
        subText="Tarefas Em Andamento"
      />
      <DashboardCard icon={<GlassWaterIcon />} mainText="40%" subText="Água" />
    </div>
  );
};

export default DashboardCards;
