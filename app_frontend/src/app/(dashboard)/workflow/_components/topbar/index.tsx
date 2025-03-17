import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import SaveButton from "./save-button";

const Topbar = ({
  title,
  subtitle,
  workflowId,
}: {
  title: string;
  subtitle?: string;
  workflowId: string;
}) => {
  return (
    <header className="flex px-2 border-p-2 border-separate items-center justify-between w-full h-[60px] sticky top-0 bg-background z-10">
      <div className="flex flex-1 gap-1">
        <Button variant="ghost" size="icon">
          <ChevronLeft size={20} />
        </Button>
        <div>
          <p className="font-bold text-ellipsis truncate">{title}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground text-ellipsis truncate">
              {subtitle || "Untitled Workflow"}
            </p>
          )}
        </div>
      </div>
      <SaveButton workflowId={workflowId} />
    </header>
  );
};

export default Topbar;
