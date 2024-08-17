const mongoose=require('mongoose')

const emplpyeeSchema=mongoose.Schema({
    employeename:String,
    employeeid:String,
    department:String,
    designation:String,
    salary:Number
})

const  employeemodel=mongoose.model('employee',emplpyeeSchema)

module.exports=employeemodel

