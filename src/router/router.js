const express = require('express');
const router = express.Router();
const collegeController = require('../controller/collegeController');
const internController = require('../controller/internController');

//api
router.post('/functionup/colleges', collegeController.createCollege)
router.post('/functionup/interns', internController.createInterns)
router.get('/functionup/collegeDetails', collegeController.collegeDetails)
router.all("/*",function(req,res){
    res.status(404).send({msg:"invalid http request"})
})


module.exports = router;

