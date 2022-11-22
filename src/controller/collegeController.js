const collegeModel = require('../model/collegeModel');
const internModel = require('../model/internModel')

//========================================================validator and regex====================================================//
const isValid =  function(value){
    if(typeof value == "undifined" || value == "null") return false
    if(typeof value == "string" && value.trim().length == 0) return false
    return true
}
const isValidName = function (name) {
    return /^[a-z]*$/
    .test(name)

}
const isValidfname = function (fullName) {
    return /^[a-zA-Z,'.\s]{0,150}$/
    .test(fullName)

}

let urlreg = /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i

//========================================================Create-College==========================================================//
const createCollege = async function(req , res){
    try{
    let data = req.body
    
    //checking for the empty data
    if ((Object.keys(data).length == 0)) return res.status(400).send({ status: false, messege: "please provide some values" }) 

    //cheking the credentials to be true
    let {name , fullName ,logoLink} = data
    if(!name){
        return  res.status(400).send({status:false, msg:"please provide the name key"})    }
    if(!fullName){
        return  res.status(400).send({status:false, msg:"please provide the fullName key"})    }
    if(!logoLink){
         return  res.status(400).send({status:false, msg:"please provide the logoLink Key"})    }


    //checking for the name
    if(!isValid(name)) return res.status(400).send({status:false , message: "please provide the name"})
    if (!isValidName(name)) return res.status(400).send({ status: false, message: "plese provide the name in LOWERCASE" })
    let uniqueName = await collegeModel.findOne({ name })
    if (uniqueName) return res.status(400).send({ status: false, messege: "This College already exist" }) 

    //checking for the fullname
    if(!isValid(fullName)) return res.status(400).send({status:false , message: "please provide the fullname"})
    if (!isValidfname (fullName)) return res.status(400).send({ status:false , message: "plese provide fullname, only single space allowed " })

    //checking for the logolink
    if(!isValid(logoLink)) return res.status(400).send({status:false , message: "please provide the logolink"})
    if (!urlreg.test(logoLink)) return res.status(400).send({ status: false, message: "plese provide logolink in a correct format" })

    //checking for the isDeleted
    let isDeleted = req.body.isDeleted
    if (isDeleted) return res.status(400).send({ status: false, messege: "You can't delete data" }) 

    //creating college
    let saveCollege = await collegeModel.create(data);
    return res.status(201).send({ status: true, data: saveCollege });

}catch(error) {
    return res.status(500).send({ status: false, messege: error.messege })
}
}

module.exports.createCollege = createCollege

//=============================================Get College details==========================================================//

const collegeDetails = async function (req, res) {
    try {
    const collegeName = req.query.collegeName;
//----------------college Name-----------------------
      if (!collegeName) {
         return res.status(400).send({ status: false, msg: "please Provide college name" });
    }
//--------------finding the colllege Detail--------------------
    const collegeDetails = await collegeModel.findOne({ name: collegeName });
      if (!collegeDetails) {
         return res.status(400).send({ status: false, mag: "please provide a valid college name" });
    }
//----------------find intern data------------------------
    const interns = await internModel.find({ collegeId: collegeDetails._id });
     
    const college = {
        name: collegeDetails.name,
        fullName: collegeDetails.fullName,
        logoLink: collegeDetails.logoLink,
        interns: interns,
    };
        return res.status(200).send({ status: true, data: college });
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
};

module.exports.collegeDetails = collegeDetails