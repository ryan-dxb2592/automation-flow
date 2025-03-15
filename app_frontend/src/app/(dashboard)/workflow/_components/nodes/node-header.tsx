import { Badge } from "@/components/ui/badge";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { TaskType } from "@/types/task-type";
import { CoinsIcon } from "lucide-react";

const NodeHeader = ({ taskType }: { taskType: TaskType }) => {
  const task = TaskRegistry[taskType];
  return (
    <div className="flex items-center gap-2 p-2">
      <task.icon size={16} />
      <div className="flex justify-between items-center w-full">
        <p className="text-xs font-bold uppercase text-muted-foreground">
          {task.label}
        </p>
        <div className="flex items-center gap-2">
          {task.isEntryPoint && <Badge>Entry Point</Badge>}
          <Badge className="flex items-center gap-2 text-xs">
            <CoinsIcon size={16} />
            TODO
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default NodeHeader;
