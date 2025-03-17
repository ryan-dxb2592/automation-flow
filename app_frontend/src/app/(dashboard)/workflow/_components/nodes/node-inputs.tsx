import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/task-type";
import { Handle, Position } from "@xyflow/react";
import NodeParamField from "./node-param-field";
import { ColorForHandle } from "./common";

const NodeInputs = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col divide-y gap-2">{children}</div>;
};

const NodeInput = ({ input, nodeId }: { input: TaskParam; nodeId: string }) => {
  return (
    <div className="flex justify-start relative p-3 bg-secondary w-full">
      <NodeParamField input={input} nodeId={nodeId} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          type="target"
          position={Position.Left}
          className={cn(
            "!bg-muted-forground !border-2 !border-background !-left-2 !w-4 !h-4",
            ColorForHandle[input.type]
          )}
        />
      )}
    </div>
  );
};

export { NodeInputs, NodeInput };
