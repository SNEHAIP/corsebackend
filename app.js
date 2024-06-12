const express= require("express")
const mongoose= require("mongoose")
const cors=require("cors")
const {coursemodel}=require("./models/course")

const app= express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://snehaip:sneha2020@cluster0.swl0hmq.mongodb.net/coursedb?retryWrites=true&w=majority&appName=Cluster0")

app.post("/add",(req,res)=>{
    let input =req.body
    let course=new coursemodel(input)
    course.save()
    res.json({status:"success"})
})
app.get("/view",(req,res)=>{
    
    coursemodel.find().then(
        (data)=>{
        res.json(data)
    }).catch()

})
app.post("/search",(req,res)=>{
    let input=req.body
    coursemodel.find(input).then(
        (data)=>{
        res.json(data)
        })
        .catch(
            (error)=>{
            res.json("error")
        })

        })

app.post("/delete",(req,res)=>{
    let input =req.body
    coursemodel.findByIdAndDelete(input._id).then(
        (response)=>{
            res.json({"status":"succcess"})
        }
    )
    .catch(
        (error)=>{
            res.json(
                {"status":"error"}
            )
        }
    )
})
app.listen(8080,()=>{
    console.log("server started")
})