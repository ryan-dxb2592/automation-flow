import { Node } from "@xyflow/react";
import { TaskParam, TaskType } from "./task-type";

export interface AppNodeData {
  type: TaskType;
  inputs: Record<string, string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
export interface AppNode extends Node {
  data: AppNodeData;
}

export interface AppNodeInput {
  input: TaskParam;
  value?: string;
  updateNodeInput: (value: string) => void;
  disabled?: boolean;
}
