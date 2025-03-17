import { TaskParamType, TaskType } from "@/types/task-type";
import { GlobeIcon, LucideProps } from "lucide-react";

export const LaunchBrowserTask = {
  type: TaskType.LAUNCH_BROWSER,
  label: "Launch Browser",
  icon: (props: LucideProps) => <GlobeIcon {...props} />,
  isEntryPoint: true,
  inputs: [
    {
      name: "Website Url",
      type: TaskParamType.STRING,
      helperText: "eg: https://www.google.com",
      required: true,
      hideHandle: true,
    },
  ],
  output: [
    {
      name: "Webpage URL",
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ],
};
