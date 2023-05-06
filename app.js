const express=require('express')
const app=express()
require('./db/config')
const user=require('./db/model.js')

app.use(express.json())

// sign up API
app.post('/Register',async(req,res)=>{
    let data= await user(req.body)
    let result=await data.save()
    // result=result.toObject();
    // delete result.password
    //console.log(fdss)
    res.send(result)
})
app.listen(5000,console.log('server is running on port 5000'))