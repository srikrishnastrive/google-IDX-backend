
import util from 'util';
import child_process, { exec } from 'child_process';
import fs from 'fs/promises';
import uuid4 from 'uuid4';

const execPromisified = util.promisify(child_process.exec);


export const createProjectController = async (req,res) => {
    try {
        // const {stdout,stderr} = await execPromisified('dir'); // dir in windows ls in linux ,macos

        // console.log('stdout',stdout);
        // console.log('stderr',stderr);
        //create a unique id and then inside the projects folder create a new folder with that id
        const projectId = uuid4();
        console.log("New project id is",projectId);

        await fs.mkdir(`./projects/${projectId}`);
        //after this call the npm create vite command in the newly created project folder
        const response = await execPromisified('npm create vite@latest sandbox -- --template react',{
            cwd:`./projects/${projectId}`
        });
        return res.json({message:'Project created',data:projectId});
    } catch (error) {
        console.error('Error executing command',error);
        return res.status(500).json({ error: 'Failed to execute command', details: error.message });
    }
}
