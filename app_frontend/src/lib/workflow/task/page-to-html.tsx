import { TaskParamType, TaskType } from "@/types/task-type";
import { Code, LucideProps } from "lucide-react";

export const PageToHtmlTask = {
  type: TaskType.PAGE_TO_HTML,
  label: "Get HTML from URL",
  icon: (props: LucideProps) => <Code {...props} />,
  isEntryPoint: false,
  inputs: [
    {
      name: "Webpage URL",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    },
  ],
  output: [
    {
      name: "HTML",
      type: TaskParamType.STRING,
    },
    {
      name: "Webpage URL",
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ],
};
