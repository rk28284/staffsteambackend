const express = require("express");
const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userRouter = express.Router();

userRouter.post("/register",async(req,res)=>{
  const payload=req.body
   console.log("hhhhhhhh",req.body)
  try {
     const reqData=await userModel.find({email:payload.email})
     if(reqData.length>0){
      res.status(200).send({"msg":"User ALready Register"})
     }
     bcrypt.hash(payload.password, 5,async function(err, hash) {
      // Store hash in your password DB.
      if(err){
          res.status(200).send({"msg":"Something Error with bcrypt"})
      }
      const addData=await userModel({
        username: payload.username,
        email: payload.email,
        password: hash,
        avatar: payload.avatar,
      })
      console.log("gggggggg",addData)
     let store = await addData.save()
     console.log("kkkkkkkk",store)
      res.status(200).send({"msg":"User Register Successfully"})
  });
  } catch (error) {
      res.status(400).send({"msg":"Something Went wrong","error":error})
  }
})


userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
    return  res.status(200).send({ msg: "Email Not  Found" });
    }
    if (!password) {
     return res.status(200).send({ msg: "Password Not  Found" });
    }
    const reqData = await userModel.find({ email });
console.log(reqData);
const hashpassword=reqData[0].password
    if (reqData.length == 0) {
    return  res.status(200).send({ msg: "Please Register First" });
    } else {
      bcrypt.compare(password, hashpassword, function (err, result) {
        if (result) {
          var token = jwt.sign({ foo: "bar" }, process.env.KEY);
          return res.status(200).send({ msg: "Login Successfull", token: token });
        } else {
      res.status(200).send({ msg:"Password not Match"});
       return   res.status(400).send({ msg: "Something went wrong" });
        }
      });
    }
  } catch (error) {
  return  res.status(200).send({ msg: "Something not found" });
  }
});
module.exports = userRouter;
