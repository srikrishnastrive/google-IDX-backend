import express from 'express';
import { PORT } from './config/serverConfig.js';
import cors from 'cors';
import apiRouter from './routes/index.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get('/',(req,res)=>{
    return res.json({message:'pong'});
})

app.use('/api',apiRouter)
app.listen(PORT,()=>{
    console.log(`sever start at ${PORT}`);
});
