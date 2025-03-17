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
  getOutgoers,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import NodeComponent from "./nodes/node-component";
import { useCallback, useEffect } from "react";
import { WorkflowType } from "@/types/workflow";
import { AppNode } from "@/types/app-node";
import DeletableEdge from "./edges/deletable-edge";
import { TaskRegistry } from "@/lib/workflow/task/registry";

const nodeTypes = {
  AutomationNode: NodeComponent,
};

const edgeTypes = {
  default: DeletableEdge,
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
  const { setViewport, updateNodeData, screenToFlowPosition } = useReactFlow();

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

      // If the edge is not connected to a node, then return
      if (!connection.targetHandle) return;

      // Remove input value from the node if it is connected to a source node
      const node = nodes.find((n) => n.id === connection.target);

      if (!node) return;

      const nodeInputs = node.data.inputs;

      if (!nodeInputs) return;

      // Better Solution is to delete the target handle from the node
      // delete nodeInputs[connection.targetHandle];

      updateNodeData(node.id, {
        inputs: {
          ...nodeInputs,
          [connection.targetHandle]: "",
        },
      });
      // console.log("Updated node inputs", node.id);
    },
    [nodes, setEdges, updateNodeData]
  );

  const isValidConnection = useCallback(
    (connection: Edge | Connection) => {
      // No self Connection
      if (connection.source === connection.target) return false;

      //  Same Task Type Connection
      const sourceNode = nodes.find((n) => n.id === connection.source);
      const targetNode = nodes.find((n) => n.id === connection.target);

      if (!sourceNode || !targetNode) return false;

      const sourceTask = TaskRegistry[sourceNode.data.type];
      const targetTask = TaskRegistry[targetNode.data.type];

      const output = sourceTask.output.find(
        (o) => o.name === connection.sourceHandle
      );
      const input = targetTask.inputs.find(
        (i) => i.name === connection.targetHandle
      );

      if (!output || !input) return false;

      if (output.type !== input.type) return false;

      // Prevent Cycle Connection

      const hasCycle = (node: AppNode, visited = new Set()) => {
        if (visited.has(node.id)) return false;
        visited.add(node.id);

        for (const outgoer of getOutgoers(node, nodes, edges)) {
          if (outgoer.id === connection.source) return true;
          if (hasCycle(outgoer, visited)) return true;
        }
      };

      const detectedCycle = hasCycle(targetNode);

      return !detectedCycle;
    },
    [nodes, edges]
  );

  // console.log("Nodes", nodes);
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
        isValidConnection={isValidConnection}
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  );
};

export default FlowEditor;
