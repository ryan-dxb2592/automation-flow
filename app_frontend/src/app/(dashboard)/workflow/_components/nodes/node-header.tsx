import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreateFlowNode } from "@/lib/workflow/create-flow-node";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { AppNode } from "@/types/app-node";
import { TaskType } from "@/types/task-type";
import { useReactFlow } from "@xyflow/react";
import { CoinsIcon, Copy, GripVertical, Trash } from "lucide-react";

const NodeHeader = ({
  taskType,
  nodeId,
}: {
  taskType: TaskType;
  nodeId: string;
}) => {
  const { deleteElements, getNode, addNodes } = useReactFlow();
  const task = TaskRegistry[taskType];
  return (
    <div className="flex items-center gap-2 p-2">
      <task.icon size={16} />
      <div className="flex justify-between items-center w-full">
        <p className="text-xs font-bold uppercase text-muted-foreground">
          {task.label}
        </p>
        <div className="flex items-center gap-1">
          {task.isEntryPoint && <Badge>Entry Point</Badge>}
          <Badge className="flex items-center gap-2 text-xs">
            <CoinsIcon size={16} />
            {task.credits}
          </Badge>
          {!task.isEntryPoint && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteElements({ nodes: [{ id: nodeId }] })}
              >
                <Trash size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const node = getNode(nodeId) as AppNode;
                  const newX = node.position.x;
                  const newY = node.position.y + node.measured!.height! + 20;

                  const newNode = CreateFlowNode(node.data.type, {
                    x: newX,
                    y: newY,
                  });
                  addNodes([newNode]);
                }}
              >
                <Copy size={16} />
              </Button>
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="cursor-grab drag-handle"
          >
            <GripVertical size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NodeHeader;
