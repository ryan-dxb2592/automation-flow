"use client";
import { CreateFlowNode } from "@/lib/workflow/create-flow-node";
import { TaskType } from "@/types/task-type";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
  FitViewOptions,
  useReactFlow,
  Connection,
  addEdge,
  Edge,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import NodeComponent from "./nodes/node-component";
import { useCallback, useEffect } from "react";
import { WorkflowType } from "@/types/workflow";
import { AppNode } from "@/types/app-node";
import DeletableEdge from "./edges/deletable-edge";

const nodeTypes = {
  AutomationNode: NodeComponent,
};

const edgeTypes = {
  defaukt: DeletableEdge,
};

// Snap to grid
const snapGrid: [number, number] = [50, 50];

// Fit view
const fitViewOptions: FitViewOptions = {
  padding: 0.2,
  maxZoom: 0.5,
  minZoom: 0.1,
};

const FlowEditor = ({ workflow }: { workflow: WorkflowType }) => {
  const [nodes, setNodes, onNodeChange] = useNodesState<AppNode>([
    CreateFlowNode(TaskType.LAUNCH_BROWSER),
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { setViewport, screenToFlowPosition } = useReactFlow();

  //  Once we connect to the database, we need to load the workflow definition
  // useEffect(() => {
  //   try {
  //     const flow = JSON.parse(workflow?.definition);
  //     if (!flow) return;
  //     setNodes(flow.nodes || []);
  //     setEdges(flow.edges || []);

  //     if (!flow.viewport) return;
  //     const { x = 0, y = 0, zoom = 1 } = flow.viewport;

  //     setViewport({ x, y, zoom });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [setNodes, setEdges, workflow]);

  // On Drag Over
  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const taskType = event.dataTransfer.getData("application/reactflow");

      if (!taskType || typeof taskType === "undefined") return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = CreateFlowNode(taskType as TaskType, position);
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes, screenToFlowPosition]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds));
    },
    [setEdges]
  );

  return (
    <main className="flex flex-col h-full w-full overflow-hidden ">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodeChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        snapGrid={snapGrid}
        fitViewOptions={fitViewOptions}
        snapToGrid
        fitView
        onDrop={onDrop}
        onDragOver={onDragOver}
        onConnect={onConnect}
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  );
};

export default FlowEditor;
