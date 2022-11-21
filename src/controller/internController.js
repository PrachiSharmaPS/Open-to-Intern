const internModel = require('../model/internModel')
const collegeModel = require('../model/collegeModel')

let testEmail=new RegExp('[a-zA-Z0-9]+@[a-z]mail.com');
let testnumber=new RegExp('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$');

const createInterns= async function(req,res){
    try{
    const internData=req.body
const  { name, mobile, email, collegeName}=internData

    if(!name &&!mobile && !email && !collegeName){
        res.status(400).send({status:false, msg:"please provide intern data"}) 
     }
    if(!name){
        res.status(400).send({status:false, msg:"please provide intern name"})    }
   if(!mobile){
        res.status(400).send({status:false, msg:"please provide intern name"})    }
   if(!email){
        res.status(400).send({status:false, msg:"please provide intern name"})    }
   if(!collegeName){
        res.status(400).send({status:false, msg:"please provide intern name"})    
    }

    const verifyEmail= testEmail.test(email)
    if(!verifyEmail){ return res.status(400).send({status:false,msg :"Invalid Email"})}
    const verifyNumber= testnumber.test(mobile)
    if(!verifyNumber){ return res.status(400).send({status:false,msg :"Invalid Email"})}

    const colgId= await collegeModel.findOne({collegeName:collegeName}).select({collegeId:1,_id:0})
   if(!colgId){
    res.status(400).send({status:false, msg:"college name is not avilable"})    
}

internData.collegeId=colgId

const intern= await internModel.create(internData)

    res.status(201).send({status:true, data:intern})    

}
catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
}
module.exports.createInterns=createInterns