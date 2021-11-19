const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')
const bodyParser=require("body-parser")
dotenv.config()

const app=express()
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

 app.use(cors(corsOptions))
 app.use(bodyParser.json())
 app.use('/uploads/images',express.static("uploads/images"))   //to make images available public

 //connect to db
const MongoClient = require('mongodb').MongoClient
const connectionString='mongodb+srv://tanvi:tanvi123@cluster0.vklun.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
MongoClient.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('Online-Course-Management')
    const courseCollection=db.collection('courses')

    app.get('/',async (req,res)=>{
    const data = await courseCollection.find()
    data.toArray((err,items)=>{
      return res.json(items)
    })
    })

    app.post('/add-course',(req,res)=>{
      courseCollection.insertOne(req.body)
      .then(
        res.status(200).send("Added")
      )
      .catch(error=>console.log(error)) 
    })
  })
.catch(error=>console.log(error))
const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server started on ${PORT}`)
})

//setup routes

// app.use('/companies',require("./routers/companies"))





















  