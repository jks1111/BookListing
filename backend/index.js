import express, { request, response } from "express"
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose"
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'


const app = express();

//middleware for parsing request body
app.use(express.json()); 

//middleware for handling cors policy
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET','POST', 'PUT', 'DELETE'],
    allowedHeaders: ['content-Type'],
  })
)

app.get('/',(request,response)=>{
     console.log(request);
     return response.status(234).send('Hey!Have A Good Day :)');
});

app.use('/books', booksRoute);

mongoose.connect(mongoDBURL)
  .then(()=>{
    console.log('App connected to database');
    app.listen(PORT,()=>{
      console.log(`App is listening to port ${PORT}`);
    });
  })
  .catch((error)=>{
    console.log(error);
  })