import express from 'express';
import {createProjectController, getProjectTree} from '../../controllers/projectController.js';

const projectsRouter = express.Router();

projectsRouter.post('/',createProjectController);
projectsRouter.get('/:projectId/tree',getProjectTree);

export default projectsRouter;




