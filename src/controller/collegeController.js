const collegeModel = require('../model/collegeModel');
const mongoose = require('mongoose')

const isValid =  function(value){
    if(typeof value == "undifined" || value == "null") return false
    if(typeof value == "string" && value.trim().length == 0) return false
    return true
}
const isValidName = function (name) {
    return /^[a-zA-Z]+([_-]?[a-zA-Z])*$/
    .test(name)

}
const isValidfname = function (fullname) {
    return /^[a-zA-Z,'.\s]{0,150}$/
    .test(fullname)

}

let urlreg = /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i


const createCollege = async function(req , res){
    try{
    let data = req.body
    //
    if ((Object.keys(data).length == 0)) { return res.status(400).send({ status: false, messege: "please provide some values" }) }
    let {name , fullname ,logolink} = data

    if(!isValid(name)) return res.status(400).send({status:false , message: "please provide the name"})
    if (!isValidName(name)) return res.status(400).send({ status: false, message: "plese provide the name without space" })
    let uniqueName = await collegeModel.findOne({ name })
    if (uniqueName) { return res.status(400).send({ status: false, messege: "This College already exist" }) }

    if(!isValid(fullname)) return res.status(400).send({status:false , message: "please provide the fullname"})
    if (!isValidfname(fullName)) return res.status(400).send({ status: false, message: "plese provide fullname, only single space allowed " })

    if(!isValid(logolink)) return res.status(400).send({status:false , message: "please provide the logolink"})
    if (!urlreg.test(logoLink)) return res.status(400).send({ status: false, message: "plese provide logolink in a correct format" })

    let isDeleted = req.body.isDeleted
    if (isDeleted) { return res.status(400).send({ status: false, messege: "You cant delete data" }) }

    let saveCollege = await collegeModel.create(data);
    return res.status(201).send({ status: true, data: saveCollege });

} catch(error) {
    return res.status(500).send({ status: false, messege: error.messege })
}
}




module.exports.createCollege = createCollege