import { Button } from "@/components/ui/button";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  useReactFlow,
} from "@xyflow/react";
import { X } from "lucide-react";

const DeletableEdge = (props: EdgeProps) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath(props);
  const { setEdges } = useReactFlow();
  return (
    <>
      <BaseEdge
        path={edgePath}
        // markerEnd={markerEnd}
        // style={style}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "auto",
          }}
        >
          <Button
            variant="outline"
            size="icon"
            className="text-xs w-6 h-6 cursor-pointer rounded-full leading-none hover:shadow-lg hover:bg-red-500 hover:text-white transition-all duration-300"
            onClick={() => {
              setEdges((eds) => {
                return eds.filter((e) => e.id !== props.id);
              });
            }}
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default DeletableEdge;
