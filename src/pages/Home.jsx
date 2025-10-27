import "../index.css";

import DashboardCards from "../components/DashboardCards";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import TaskItem from "../components/TaskItem";
import { useGetTasks } from "../hooks/data/use-get-tasks";

const HomePage = () => {
  const { data: tasks } = useGetTasks();
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        <Header title="Dashboard" subtitle="Dashboard" />
        <DashboardCards />
        <div className="grid grid-cols-[2fr_1fr] ">
          <div className="space-y-6 rounded-xl bg-white p-6">
            <div>
              <h3 className="text-brand-dark-blue text-xl font-semibold">
                Tarefas
              </h3>
              <span className="text-brand-dark-gray text-sm">
                Resumo das tarefas disponíveis
              </span>
            </div>
            <div className="space-y-3">
              {tasks?.map((task, index) => (
                <TaskItem key={index} task={task} />
              ))}
            </div>
          </div>
          <div className="rounded-xl bg-white p-6">
            <h3 className="text-brand-dark-blue text-xl font-semibold">Água</h3>
            <span className="text-brand-dark-gray text-sm">
              Beba sua meta diária de água
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
