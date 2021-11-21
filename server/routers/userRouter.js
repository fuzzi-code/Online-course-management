const express=require("express")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const app=express()

const MongoClient = require('mongodb').MongoClient
const { MongoDBNamespace } = require('mongodb')
const connectionString='mongodb+srv://tanvi:tanvi123@cluster0.vklun.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
MongoClient.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(client => {
    const db = client.db('Online-Course-Management')
    const adminCollection=db.collection('Admin')
    app.post('/register',async (req,res)=>{
        try{
            const {name,email,password,passwordVerify}=req.body
            if(!email || !password || !passwordVerify){
                return res.
                status(200).
                json({error:"Please fill all required fields. "})
            }
            if (password.length<6){
                return res.
                status(200).
                json({error:"Please enter password of atleast length 6."})
            }
            if (password!==passwordVerify){
                return res.
                status(200).
                json({error:"Passwords do not match"})
            }        

            //hash password
            const salt=await bcrypt.genSalt()
            const passwordHash=await bcrypt.hash(password,salt)

            //Save a new user to db
            const newUser={
                name,
                email,
                passwordHash
            }
            const existingUser=await adminCollection.findOne({email})
            if (existingUser){
                return res.
                status(200).
                json({error:"email id already exists."})
            }
            const savedUser=adminCollection.insertOne(newUser)

            //sign the token
            const token=jwt.sign({
                user:savedUser._id
            },process.env.JWT_SECRET)
            
            //send the token in http-only cookie
            res.cookie("token",token,{
                httpOnly:true
            })
            res.send()        
        }catch(err){
            console.error(err)
            res.status(500).send() 
        }
    })

    //login

    app.post("/login",async (req,res)=>{
        try{
            const {email,password}=req.body
            if(!email || !password){
                return res.
                status(200).
                json({error:"Please fill all required fields. "})
            }
            
            const existingUser=await adminCollection.findOne({email})
            if (!existingUser){
                return res.status(200).json({error:'Wrong email or password'})    
            }
            
            const passwordCorrect=await bcrypt.compare(password,
                existingUser.passwordHash)
            
            if(!passwordCorrect){
                return res.status(200).json({error:'Wrong email or password'})
            }
            
            //sign the token
            const token=jwt.sign({
                user:existingUser._id
            },process.env.JWT_SECRET)
            
            //send the token in http-only cookie
            res.cookie("token",token,{
                httpOnly:true
            }).status(200).send()
        }catch(err){
            console.error(err)
            res.status(500).json({error:'Bad request'})
        }
    })

    //logout
    app.get('/logout',async (req,res)=>{
        try{
            res.cookie("token","",{
                httpOnly:true,
                expires:new Date(0)
            })
            .send("logged out")
        }catch(err){
            console.error(err)
            res.status(500).send()
        }
})
  })
.catch(error=>console.log(error))



module.exports=app