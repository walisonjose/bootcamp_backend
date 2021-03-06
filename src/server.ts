import express from 'express';
import routes from './routes';
//import uploadConfig from './config/upload';

import './database';

import 'reflect-metadata';


const cors = require('cors')

const app = express();
app.use(cors());

app.use(express.json()); 

//app.use('/files', express.static(uploadConfig.directory));
app.use(routes);


app.listen(3333, ()=>{
    console.log(' :) Server started on port 3333!')
});