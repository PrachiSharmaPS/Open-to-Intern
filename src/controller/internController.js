const internModel = require("../model/internModel");
const collegeModel = require("../model/collegeModel");

//------------------------Regex for Email ------ --------------------
let testEmail = new RegExp("^[a-z0-9]{3,}@[a-z]{3,}[.]{1}[a-z]{2,6}$");
 
//----------------------------Create Intern---------------------------------
const createInterns = async function (req, res) {
  try {
    const internData = req.body;
        if (Object.keys(internData).length == 0) {
           return res.status(400).send({ status: false, message:"Please  provide some values" });
        }
//-----------------------Destructure Intern data ----------------------------------
    const { name, mobile, email, collegeName } = internData;
//----------------------checking the name,college name and other mandatory fields is provided or not---------
        if (!name) {
            return res.status(400).send({ status:false, message:"Please provide intern name" });    
        }
        if (!collegeName) {
           return res.status(400).send({ status:false, message:"Please provide intern collegeName" }); 
        }
        if (!mobile) {
           return res.status(400).send({ status:false, message:"Please provide intern mobile" });     
        }
//-------------------- verifying number with regex--------------------------------
        if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile)) {
           return res.status(400).send({ status:false, message:"Enter valid mobile number" })
        }
//-----------------checking Unique mobile no or not---------------------------
    const number = await internModel.findOne({ mobile: mobile });
        if (number) {
           return res.status(400).send({ status: false, message:"Number is already exists" });
        }
//--------------checking email is provided or not --------------------------
        if (!email) {
           return res.status(400).send({ status:false, message:"Please provide intern email" });
        }   
//------------------verifying email with regex-----------------------------
    const verifyEmail = testEmail.test(email);
        if (!verifyEmail) {
            return res.status(400).send({ status:false, message:"Invalid Email" });
        }
//------------------checking email is unique or not--------------------
         const checkusedEmail = await internModel.findOne({ email: email });
        if (checkusedEmail) {
           return res.status(400).send({ status:false, message:"Email already used" });
        }
//--------------selecting  college id of the given college name--------
    const colgId = await collegeModel.findOne({ name: collegeName }).select({ _id: 1 });
        if (!colgId) {
           return res.status(400).send({ status:false, message:"College name is not avilable" });
        }
//--------------adding another key value in the object internData--------
    internData.collegeId = colgId;

    const intern = await internModel.create(internData);
        return res.status(201).send({ status:true, data: intern });

    } catch (error) {
        return res.status(500).send({ status:false, message: error.message });
    }
};

module.exports.createInterns = createInterns;