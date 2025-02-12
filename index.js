import express from "express"
import cors from "cors"
import helmet, { crossOriginResourcePolicy } from "helmet"
import ENV from "./config/config.js";
import analyseRoute from "./routes/analyse.routes.js"

const app = express();
app.use(helmet())
app.use(cors())
app.use(crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/',(req,res)=>{
    res.json("Successfully connected to server 🚀 !")
})

app.use('/v1/analyse', analyseRoute)


app.listen(ENV.port,()=>{
    console.log(`Server runing at port : ${ENV.port}`)
})