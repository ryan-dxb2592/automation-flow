"use client";

import { cn } from "@/lib/utils";
import { useReactFlow } from "@xyflow/react";

interface NodeCardProps {
  nodeId: string;
  children: React.ReactNode;
  isSelected: boolean;
}

const NodeCard = ({ nodeId, children, isSelected }: NodeCardProps) => {
  const { getNode, setCenter } = useReactFlow();

  return (
    <div
      onDoubleClick={() => {
        const node = getNode(nodeId);
        if (!node) return;

        const { position, measured } = node;
        if (!measured || !position) return;

        const { width, height } = measured;
        const x = position.x + (width ?? 0) / 2;
        const y = position.y + (height ?? 0) / 2;

        if (x === undefined || y === undefined) return;

        setCenter(x, y, {
          zoom: 1,
          duration: 500,
        });
      }}
      className={cn(
        "rounded-md cursor-grab bg-background border-2 border-separate w-96 text-xs gap-1 flex flex-col",
        isSelected && "border-blue-500"
      )}
    >
      {children}
    </div>
  );
};

export default NodeCard;
