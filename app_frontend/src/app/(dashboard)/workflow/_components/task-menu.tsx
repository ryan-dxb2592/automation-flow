"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { TaskType } from "@/types/task-type";

const TaskMenu = () => {
  return (
    <aside className="w-[340px] min-w-[340px] max-w-[340px] border-r-2 border-separate border-border h-full p-2 px-4 overflow-auto">
      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={["extraction"]}
      >
        <AccordionItem value="extraction">
          <AccordionTrigger className="font-bold">
            Data Extraction
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            <TaskMenuButton taskType={TaskType.PAGE_TO_HTML} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

export default TaskMenu;

const TaskMenuButton = ({ taskType }: { taskType: TaskType }) => {
  const task = TaskRegistry[taskType];

  const onDragStart = (
    e: React.DragEvent<HTMLButtonElement>,
    taskType: TaskType
  ) => {
    e.dataTransfer.setData("application/reactflow", taskType);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <Button
      variant="secondary"
      className="w-full justify-between items-center gap-2 border "
      draggable
      onDragStart={(e) => onDragStart(e, taskType)}
    >
      <div className="flex items-center gap-2">
        <task.icon size={20} />
        <p>{task.label}</p>
      </div>
    </Button>
  );
};
