const express = require("express");
const employeemodel = require("../model/employee.model");

const emplpyeeRouter = express.Router();

emplpyeeRouter.get("/employee", async (req, res) => {
  try {
    const resData = req.body;
    const employeeData = await employeemodel.find();
    res
      .status(200)
      .send({ msg: "Employee Data Fetched Successfully",Data:employeeData });
  } catch (error) {
    res.status(400).send({ msg: "Something goes Wrong" });
  }
});

emplpyeeRouter.get("/:id",async(req,res)=>{
  const ID=req.params.id;
  try {
     const reqData=await employeemodel.find({_id:ID});
     res.status(200).json({"msg":` Employee data of id ${ID}`,"data":reqData}) 
  } catch (error) {
      console.log("error while getting a paticular Employee data");
      console.log(error);
      res.json({"msg":"error while getting a paticular Employee data","error":error})
  }
})

emplpyeeRouter.post("/addemployee", async (req, res) => {
  try {
    const resData = req.body;
    const employeeData = new employeemodel(resData);
    await employeeData.save();

    res.status(200).send({ msg: "Employee Data Added Successfully" ,Data: employeeData});
  } catch (error) {
    res.status(400).send({ msg: "Something Goes wrong" });
  }
});

emplpyeeRouter.delete("/:id",async(req,res)=>{
  const ID=req.params.id;
  
   try {
     const reqData=await employeemodel.findByIdAndDelete({_id:ID});
     res.status(202).json({"msg":`Employee data of id ${ID} deleted successfully`}) 
  } catch (error) {
      console.log("error while deleteing Employee data");
      console.log(error);
      res.json({"msg":"error while deleteing Employee data","error":error})
  }
})

emplpyeeRouter.patch("/:id",async(req,res)=>{
  const ID=req.params.id;
  const payload=req.body;
  try {
    const reqData= await employeemodel.findByIdAndUpdate({_id:ID},payload);
     res.status(204).json({"msg":`Employee data of id ${ID} updated successfully`}) 
  } catch (error) {
      console.log("error while updating Employee data");
      console.log(error);
      res.json({"msg":"error while updating Employee data","error":error})
  }
})


module.exports = emplpyeeRouter;
