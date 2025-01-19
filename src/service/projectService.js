import fs from 'fs/promises';
import uuid4 from 'uuid4';

import {REACT_PROJECT_COMMAND} from '../config/serverConfig.js';
import { execPromisified } from '../utils/execUtility.js';
import path from 'path';
import directoryTree from 'directory-tree';



export const createProjectService =  async () =>{
     // const {stdout,stderr} = await execPromisified('dir'); // dir in windows ls in linux ,macos

        // console.log('stdout',stdout);
        // console.log('stderr',stderr);
        //create a unique id and then inside the projects folder create a new folder with that id
    const projectId = uuid4();
    console.log("New project id is",projectId);
    
    await fs.mkdir(`./projects/${projectId}`);
            //after this call the npm create vite command in the newly created project folder
            const response = await execPromisified(REACT_PROJECT_COMMAND,{
                cwd:`./projects/${projectId}`
    });
    return projectId;
    
    
   

}

export const getProjectTreeService = async (projectId) => {
    const projectPath = path.resolve(`./projects/${projectId}`);
    const tree = directoryTree(projectPath);
    return tree;
}
