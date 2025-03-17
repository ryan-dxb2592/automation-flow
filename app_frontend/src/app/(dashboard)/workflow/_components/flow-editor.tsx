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
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import NodeComponent from "./nodes/node-component";
import { useEffect } from "react";
import { WorkflowType } from "@/types/workflow";

const nodeTypes = {
  AutomationNode: NodeComponent,
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
  const [nodes, setNodes, onNodeChange] = useNodesState([
    CreateFlowNode(TaskType.LAUNCH_BROWSER),
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { setViewport } = useReactFlow();

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

  return (
    <main className="flex flex-col h-full w-full overflow-hidden ">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodeChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        snapGrid={snapGrid}
        fitViewOptions={fitViewOptions}
        snapToGrid
        fitView
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  );
};

export default FlowEditor;
