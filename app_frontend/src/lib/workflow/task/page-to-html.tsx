import { TaskParamType, TaskType } from "@/types/task-type";
import { WorkflowTask } from "@/types/workflow";
import { Code, LucideProps } from "lucide-react";

export const PageToHtmlTask = {
  type: TaskType.PAGE_TO_HTML,
  label: "Get HTML from URL",
  icon: (props: LucideProps) => <Code {...props} />,
  isEntryPoint: false,
  credits: 2,
  inputs: [
    {
      name: "Webpage URL",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    },
  ],
  outputs: [
    {
      name: "HTML",
      type: TaskParamType.STRING,
    },
    {
      name: "Webpage URL",
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ],
} satisfies WorkflowTask;
