import { TaskParamType, TaskType } from "@/types/task-type";
import { Code, LucideProps } from "lucide-react";

export const PageToHtmlTask = {
  type: TaskType.PAGE_TO_HTML,
  label: "Get HTML from URL",
  icon: (props: LucideProps) => <Code {...props} />,
  isEntryPoint: true,
  inputs: [
    {
      name: "Webpage URL",
      type: TaskParamType.BROWSER_INSTANCE,
      helperText: "eg: https://www.google.com",
      required: true,
      hideHandle: true,
    },
  ],
};
