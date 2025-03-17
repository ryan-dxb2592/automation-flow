"use client";

import { TaskParam, TaskParamType } from "@/types/task-type";
import StringParam from "./param/string-param";
import { useReactFlow } from "@xyflow/react";
import { AppNode } from "@/types/app-node";
import { useCallback } from "react";
import BrowserInstanceParam from "./param/browser-instance-param";

const NodeParamField = ({
  input,
  nodeId,
  disabled,
}: {
  input: TaskParam;
  nodeId: string;
  disabled: boolean;
}) => {
  const { updateNodeData, getNode } = useReactFlow();

  const node = getNode(nodeId) as AppNode;
  const value = node.data?.inputs?.[input.name];

  const updateNodeInput = useCallback(
    (value: string) => {
      updateNodeData(nodeId, {
        ...node.data,
        inputs: { ...node.data.inputs, [input.name]: value },
      });
    },
    [nodeId, input.name, updateNodeData, node.data]
  );

  switch (input.type) {
    case TaskParamType.STRING:
      return (
        <StringParam params={{ input, value, updateNodeInput, disabled }} />
      );
    case TaskParamType.BROWSER_INSTANCE:
      return <BrowserInstanceParam params={{ input, updateNodeInput }} />;
    default:
      return (
        <div>
          <p>Not Implemented</p>
        </div>
      );
  }
};

export default NodeParamField;
