import { Skeleton } from "@/components/ui/skeleton";
import { InboxIcon } from "lucide-react";
import { Suspense } from "react";
import CreateWorkflowDialog from "./_components/create-workflow-dialog";

const WorkflowPage = async () => {
  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex items-center justify-between">
        <div className="flex flex-col ">
          <h1 className="text-2xl font-bold">Workflows</h1>
          <p className="text-sm text-muted-foreground">Manage your workflows</p>
        </div>
        <CreateWorkflowDialog triggerText="Create Workflow" />
      </div>

      {/* Suspense */}
      <div className="h-full py-6">
        <Suspense fallback={<UserWorkflowsSkeleton />}>
          <UserWorkflows />
        </Suspense>
      </div>
    </div>
  );
};

export default WorkflowPage;

const UserWorkflowsSkeleton = () => {
  return (
    <div className="space-y-2">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} className="h-32 w-full" />
      ))}
    </div>
  );
};

const UserWorkflows = async () => {
  //   const workflows = await getWorkflowsForUser();
  const workflows = [];

  if (workflows.length === 0) {
    return (
      <div className="flex flex-col gap-3 items-center mt-4 justify-center">
        <div className="flex rounded-full bg-accent w-20 h-20 items-center justify-center">
          <InboxIcon className="w-10 h-10 " />
        </div>
        <div className="flex flex-col gap-1 text-center">
          <p className="text-lg font-medium">No workflows created yet</p>
          <p className="text-sm text-muted-foreground">
            Click on the button below to create your first workflow
          </p>
        </div>
        <CreateWorkflowDialog triggerText="Create your first workflow" />
      </div>
    );
  }

  return <div></div>;
};
