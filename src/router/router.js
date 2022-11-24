const express = require('express');
const router = express.Router();
const collegeController = require('../controller/collegeController');
const internController = require('../controller/internController');

//=====================Routes=====================================//
router.post('/functionup/colleges', collegeController.createCollege)
router.post('/functionup/interns', internController.createInterns)
router.get('/functionup/collegeDetails', collegeController.collegeDetails)

//==============Route to check the http requests=================//
router.all("/*",function(req,res){
    res.status(404).send({msg:"invalid http request"})
})


module.exports = router;

