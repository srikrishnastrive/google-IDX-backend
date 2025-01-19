import express from 'express';
import { PORT } from './config/serverConfig.js';
import cors from 'cors';
import apiRouter from './routes/index.js';
import {Server} from 'socket.io';
import {createServer} from 'node:http';
import chokidar from 'chokidar';
import { json } from 'node:stream/consumers';
import { handleEditorSocketEvents } from './socketHandlers/editorHandler.js';


const app = express();
const server = createServer(app);
const io = new Server(server,{
    cors : {
        origin:'*',
        methods:['GET','POST']
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

io.on('connection',(socket)=>{
    console.log('socket emitted');
})

app.get('/',(req,res)=>{
    return res.json({message:'pong'});
})

app.use('/api',apiRouter);

const editorNameSpace = io.of('/editor');

editorNameSpace.on('connection',(socket)=>{
    console.log('editor connected');

    
    let projectId = "123";
    if (projectId){
        var watcher = chokidar.watch(`./projects/${projectId}`,{
            ignored : (path) => path.includes("node_modules"),
            persistent:true, //keep the watches running state till the time app is runnning
            awaitWriteFinish : {
                stabilityThreshold : 2000 //ensures stablility of the files before targetting the event
            },
            ignoreInitial:true // ignore the intial directory in the file
            
        });

        watcher.on("all", (event,path)=>{
            console.log(event,path);
        })
    }

    handleEditorSocketEvents(socket);
    socket.on('message',(data)=>{
        console.log('got a message event',data);
        const message = JSON.parse(data.toString());
        console.log(message);
    });

    socket.on('disconnect',async ()=>{
        await watcher.close();
        console.log("editor disconnected");
    });
   
});


server.listen(PORT,()=>{
    console.log(`sever start at ${PORT}`);
});
