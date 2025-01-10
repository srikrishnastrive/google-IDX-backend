import express from 'express';
import {createProjectController} from '../../controllers/projectController.js';

const projectsRouter = express.Router();

projectsRouter.post('/',createProjectController);

export default projectsRouter;




