import { BaseEdge, EdgeProps, getSmoothStepPath } from "@xyflow/react";

const DeletableEdge = (props: EdgeProps) => {
  const [edgePath] = getSmoothStepPath(props);
  return (
    <>
      <BaseEdge path={edgePath} />
    </>
  );
};

export default DeletableEdge;
