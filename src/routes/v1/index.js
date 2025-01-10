import express from "express";
import pingCheck from "../../controllers/pingController.js";
import projectsRouter from "./projects.js";



const v1Router = express.Router();

v1Router.use('/ping',pingCheck);
v1Router.use('/projects',projectsRouter);



export default v1Router;
