import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from "./flow-editor";
import Topbar from "./topbar";
import { WorkflowType } from "@/types/workflow";
import TaskMenu from "./task-menu";

const Editor = ({ workflow }: { workflow: WorkflowType }) => {
  return (
    <ReactFlowProvider>
      <div className="flex flex-1 flex-col h-full w-full overflow-hidden">
        <Topbar
          title="Workflow Editor"
          subtitle={workflow?.name}
          workflowId={workflow?.id ?? "new"}
        />
        <section className="flex h-full overflow-auto flex-1">
          <TaskMenu />
          <FlowEditor workflow={workflow} />
        </section>
      </div>
    </ReactFlowProvider>
  );
};

export default Editor;
