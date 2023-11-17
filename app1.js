const express = require("express")
const collection = require("./mongo")
const cors = require("cors")
const app = express()
const fileUpload = require('express-fileupload');
const fs = require ('fs');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


app.get("/",cors(),(req,res)=>{

})


app.post("/",async(req,res)=>{
    const{email,password}=req.body

    try{
        const check=await collection.findOne({email:email})
        console.log(check)

        if(check.password==password){
            res.json("exist")
        }
        else if(check.password!=password)
        {
            res.json("wrong_password")
        }
        else{
            res.json("notexist")
        }

    }
    catch(e){
        res.json("fail")
    }

})



app.post("/signup",async(req,res)=>{
    const{name,age,gender,email,password}=req.body

    const data={
        name:name,
        age:age,
        gender:gender,
        email:email,
        password:password
    }

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
            await collection.insertMany([data])
        }

    }
    catch(e){
        res.json("fail")
    }

})

app.listen(8000,()=>{
    console.log("port connected");
})
