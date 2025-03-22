import { LucideProps } from "lucide-react";
import { TaskParam, TaskType } from "./task-type";

export type WorkflowType = {
  id: string;
  name: string;
  definition: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export type WorkflowTask = {
  label: string;
  icon: React.FC<LucideProps>;
  type: TaskType;
  isEntryPoint?: boolean;
  inputs: TaskParam[];
  outputs: TaskParam[];
  credits: number;
};
