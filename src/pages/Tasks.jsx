import "../index.css";

import Sidebar from "../components/SideBar";
import Tasks from "../components/Tasks";

function TasksPage() {
  return (
    <div className="flex">
      <Sidebar />
      <Tasks />
    </div>
  );
}

export default TasksPage;
