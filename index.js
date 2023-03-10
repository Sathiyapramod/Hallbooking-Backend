import express from 'express';
import hallRouter from './router/hall.router.js';

const app = express();
app.use(express.json()); // installing middleware
app.use("/hall",hallRouter);
const PORT = 4000;
// http://localhost:4000/

app.get("/",(request,response)=>{
    response.send({"message":"Welcome to Hall Booking API !!!"});
})

app.listen(PORT, ()=> console.log(`The Server is Running on Port : ${PORT}`));