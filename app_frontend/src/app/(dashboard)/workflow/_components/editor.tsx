import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from "./flow-editor";

const Editor = () => {
  return (
    <ReactFlowProvider>
      <div className="flex flex-1 flex-col h-full w-full overflow-hidden">
        <section className="flex h-full overflow-auto flex-1">
          <FlowEditor />
        </section>
      </div>
    </ReactFlowProvider>
  );
};

export default Editor;
