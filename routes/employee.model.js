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



module.exports = emplpyeeRouter;
