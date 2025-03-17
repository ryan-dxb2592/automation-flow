"use client";

import { Button } from "@/components/ui/button";
import { useReactFlow } from "@xyflow/react";
import { Check } from "lucide-react";

const SaveButton = ({ workflowId }: { workflowId: string }) => {
  const { toObject } = useReactFlow();

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      onClick={() => {
        console.log(workflowId);
      }}
    >
      <Check size={16} />
      Save
    </Button>
  );
};

export default SaveButton;
