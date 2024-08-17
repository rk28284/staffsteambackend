const express = require("express");
const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userRouter = express.Router();


// userRouter.post("/register", async (req, res) => {
//   const payload = req.body;

//   try {
//     const ExistUser = await userModel.findOne({ email: payload.email });
    
//     if (ExistUser) {
//       res.status(400).send({ msg: "User Already Register" });
//       return
//     }
//     bcrypt.hash(payload.password, 4, async function (err, hash) {
//       // Store hash in your password DB.
//       const addData = new userModel({
//         name: payload.name,
//         email: payload.email,
//         password: hash,
//         phone: payload.phone,
//       });
//       await addData.save();
//       res
//         .status(200)
//         .send({ msg: "UserData Has been Addded" }, { Data: addData });
//     });
//   } catch (error) {
//     res.status(400).send({ msg: "Something Went Wrong" });
//   }
// });


userRouter.post("/register",async(req,res)=>{
  const payload=req.body
 
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
         name: payload.name,
        email: payload.email,
        password: hash,
        phone: payload.phone,
      })
      await addData.save()
      res.status(200).send({"msg":"User Register Successfully"})
  });
  } catch (error) {
      res.status(400).send({"msg":"Something Went wrong","error":error})
  }
})
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const reqData = await userModel.find({ email });
    if (!email) {
      res.status(200).send({ msg: "Email Not  Found" });
    }
    if (!password) {
      res.status(200).send({ msg: "Password Not  Found" });
    }
    if (reqData.length == 0) {
      res.status(200).send({ msg: "Please Register First" });
    } else {
      bcrypt.compare(password, hash, function (err, result) {
        // result == true
        if (result) {
          var token = jwt.sign({ foo: "bar" }, process.env.key);
          res.status(200).send({ msg: "Login Successfull", token: token });
        } else {
          res.status(400).send({ msg: "Something went wrong" });
        }
      });
    }
  } catch (error) {
    res.status(200).send({ msg: "Something not found" });
  }
});

module.exports = userRouter;
