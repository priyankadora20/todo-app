const express = require("express");
const todoRouter = express.Router()
const {TodoModel} = require("../models/todo.model")



todoRouter.get("/", async (req, res) => {
    const params = req.query
    try{
        const users = await TodoModel.find(params)
        res.send(users)
        
      
    }
    catch(err){
        console.log(err)
        res.send({"err" : "something went wrong"})
    }
  
})

todoRouter.post("/createtodos", async (req, res) => {
    const payload = req.body
    try{
        const user = new TodoModel(payload)
        await user.save()
        res.send({"msg" : "Created successfully"})
    }
    catch(err){
        console.log(err)
        res.send({"err" : "something went wrong"})
    }
})

todoRouter.patch("/edittodos", async (req, res) => {
    const userID = req.params.userID
    const payload = req.body;
    try{
        const query = await TodoModel.findByIdAndUpdate({_id :userID},payload)
        console.log(query)
        res.send("Updated")
    }
    catch(err){
        console.log(err)
        res.send({"err" : "something went wrong, try again later"})
    }
})

todoRouter.delete("/deletetodos", async (req, res) => {
    const userID = req.params.userID
    try{
        await TodoModel.findByIdAndDelete({_id : userID})
        res.send(`User ${userID} deleted successfully`)
    }
    catch(err){
        console.log(err)
        res.send({"err" : "something went wrong, try again later"})
    }
})


module.exports ={todoRouter}