import { AppNode } from "@/types/app-node";
import { TaskType } from "@/types/task-type";
import { v4 as uuidv4 } from "uuid";

export const CreateFlowNode = (
  nodeType: TaskType,
  position?: { x: number; y: number }
): AppNode => {
  return {
    id: uuidv4(),
    type: "AutomationNode",
    dragHandle: ".drag-handle",
    position: position ?? { x: 0, y: 0 },
    data: {
      type: nodeType,
      inputs: {},
    },
  };
};
