import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import battleData from './routes/battleData';
import dotenv from 'dotenv';
import Promise from 'bluebird';

dotenv.config()
const __dirname = path.resolve()
const app = express();
app.use(bodyParser.json());
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL,{ useUnifiedTopology: true , useNewUrlParser: true})
app.use('/api/battleData',battleData);
app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'src/index.html'));
})
const PORT = process.env.PORT || 8080;
app.listen(PORT,'0.0.0.0',()=> console.log(`running on ${PORT}`));