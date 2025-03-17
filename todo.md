- Create Breadcrumb component (refer to previous build)
- Complete active path and link
- Create Worflow action and complete the create workflow dialog.
- Add a Toaster to check status


- Create a loding template when the editor is loading
- Create the workflow editor in the work

YT - 2:16

- In the Save Button we need to save workflow in the database

Since this is a scrapper flow. We will always create the first node when a workflow is created. The first node will always be a launch browser.


const initialFlow: {nodes: AppNode[]; edges:Edge[]} = {
    nodes: [],
    edges: []
}

intialFlow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER))