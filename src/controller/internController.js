const internModel = require('../model/internModel')
const collegeModel = require('../model/collegeModel')

let testEmail=new RegExp('^[a-z0-9]{3,}@[a-z]{3,}[.]{1}[a-z]{3,6}$');
let testnumber=new RegExp('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$');

const createInterns= async function(req,res){
    try{
    const internData=req.body

    if ((Object.keys(internData).length == 0))
         { return res.status(400).send({ status: false, messege: "please provide some values" })    }
       
        const  { name, mobile, email, collegeName}=internData
    if(!name){
        return  res.status(400).send({status:false, msg:"please provide intern name"})    }
   if(!mobile){
    return  res.status(400).send({status:false, msg:"please provide intern mobile"})    }
        const number=await internModel.findOne({mobile:mobile})
    if(number){
        return res.status(400).send({status:false, msa:"number is already exists"})}
   if(!email){
    return    res.status(400).send({status:false, msg:"please provide intern email"})    }
   if(!collegeName){
    return    res.status(400).send({status:false, msg:"please provide intern collegeName"})    
    }
    const verifyEmail= testEmail.test(email)
    if(!verifyEmail){
         return res.status(400).send({status:false,msg :"Invalid Email"})}

    const checkusedEmail = await internModel.findOne({ email:email });
    if (checkusedEmail) {                                                            
        return res.status(400).send({ status: false, message: "email already used" });
         }

    const verifyNumber= testnumber.test(mobile)
    
    if(!verifyNumber){ 
        return res.status(400).send({status:false, msg :"Invalid number"})}

    const colgId= await collegeModel.findOne({fullName:collegeName}).select({_id:1})
   if(!colgId){
    return   res.status(400).send({status:false, msg:"college name is not avilable"})    
}

internData.collegeId=colgId

const intern= await internModel.create(internData)

return   res.status(201).send({status:true, data:intern})    

}
catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
}
module.exports.createInterns=createInterns