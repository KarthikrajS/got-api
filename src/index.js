import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import battleData from './routes/battleData';
import dotenv from 'dotenv';
import Promise from 'bluebird';
import cors from 'cors'

dotenv.config()
const __dirname = path.resolve()
const app = express();

app.use(bodyParser.json());
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL,{ useUnifiedTopology: true , useNewUrlParser: true})

app.use('/battleData',battleData);
app.use(cors())
app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'src/index.html'),function (err){
        if(err) res.status(500).send(err)
    });

})
const PORT = process.env.PORT || 8080;

app.listen(PORT,()=> console.log(`running on ${PORT}`));