import { TaskType } from "@/types/task-type";
import { GlobeIcon, LucideProps } from "lucide-react";

export const LaunchBrowserTask = {
  type: TaskType.LAUNCH_BROWSER,
  label: "Launch Browser",
  icon: (props: LucideProps) => <GlobeIcon {...props} />,
  isEntryPoint: true,
};
