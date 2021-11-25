const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')
const bodyParser=require("body-parser")
const fileupload = require('./middleware/file-uploads')
const checkAuth = require('./middleware/check-auth')

dotenv.config()

const app=express()
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

 app.use(cors(corsOptions))
 app.use(bodyParser.json())
 app.use("/auth", require('./routers/userRouter'))
 app.use('/uploads/images',express.static("uploads/images"))   //to make images available public

 //connect to db
const MongoClient = require('mongodb').MongoClient
const { MongoDBNamespace } = require('mongodb')
const connectionString='mongodb+srv://tanvi:tanvi123@cluster0.vklun.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
MongoClient.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(client => {
    
    const db = client.db('Online-Course-Management')
    const courseCollection=db.collection('courses')
    const courseEnrolledCollection = db.collection("course-enrolled")
    console.log('Connected to Database')

    //routers
    //get the course details(student)
    app.get('/',async (req,res)=>{
    const data = await courseCollection.find()
    data.toArray((err,items)=>{
      return res.json(items)
    })
    })
    //enroll in course(student)
      app.post('/enroll-course',(req,res)=>{
      courseEnrolledCollection.insertOne(req.body)
      res.status(200).json("Enrolled Successfully")
    })

    app.use(checkAuth)

    //add courses(admin)
    app.post('/add-course',fileupload.single("courseImage"),(req,res)=>{

      const newCourse={
        ...req.body,
        courseImage:req.file.path
      }
      courseCollection.insertOne(newCourse)
      .then(
        res.status(200).send("Added")
      )
      .catch(error=>console.log(error)) 
    })

    

    //get enrolled courses info(admin)
    app.get("/course-info",async (req,res)=>{
      const data = await courseEnrolledCollection.find()
      data.toArray((err,items)=>{
      return res.json(items)
    })
    })

    //delete a course (admin)
    app.delete("/delete-course/:id",async(req,res)=>{
      try{
      courseCollection.deleteOne(
        {_id:new mongodb.ObjectId(req.params.id)},
        res.status(200).json("deleted successfully")
      )
      }catch(err){
        res.status(400).json("unable to delete, something went wrong")
      }
    })

    //update a course (admin)
    app.put('/update-course/:id',async (req, res)=>{
      try{
      courseCollection.findOneAndUpdate(
        { _id: new mongodb.ObjectId(req.params.id) },
        { $set: {name:req.body.name} },
          res.status(200).json('Success updated!')
      )
      }catch(err){
        res.status(400).json("unable to update, something went wrong")
      }
      })
  })
.catch(error=>console.log(error))
const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server started on ${PORT}`)
})

//setup routes

// app.use('/companies',require("./routers/companies"))





















  