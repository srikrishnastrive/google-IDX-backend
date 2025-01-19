import { createProjectService, getProjectTreeService } from "../service/projectService.js";


export const createProjectController = async (req,res) => {
    try {
        const projectId = await createProjectService();
        return res.json({message:'Project created',data:projectId});
    } catch (error) {
        console.error('Error executing command',error);
        return res.status(500).json({ error: 'Failed to execute command', details: error.message });
    } 
}

export const getProjectTree = async (req,res)=> {
    try {
        const projectTree = await getProjectTreeService(req.params.projectId);
        return res.status(200).json({
            data:projectTree,
            success:true,
            message :"Successfully fetched the tree"
        })
    } catch (error) {
        console.error('Error executing command',error);
        return res.status(500).json({ error: 'Failed to execute command', details: error.message });
    }
}
