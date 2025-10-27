import { useState } from "react";

import { AddIcon, TrashIcon } from "../assets";
import AddTaskDialog from "./AddTaskDialog";
import Button from "./Button";

function Header({ subtitle, title }) {
  const [AddTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false);
  return (
    <div className="flex w-full justify-between">
      <div>
        <span className="text-brand-primary text-xs font-semibold">
          {subtitle}
        </span>
        <h2 className="text-brand-dark-blue text-xl font-semibold">{title}</h2>
      </div>
      <div className="flex items-center gap-3">
        <Button color="ghost">
          Limpar Tarefa
          <TrashIcon />
        </Button>
        <Button variant="primary" onClick={() => setAddTaskDialogIsOpen(true)}>
          Adicionar Tarefa
          <AddIcon />
        </Button>
        <AddTaskDialog
          isOpen={AddTaskDialogIsOpen}
          handleDialogClose={() => setAddTaskDialogIsOpen(false)}
        />
      </div>
    </div>
  );
}

export default Header;
