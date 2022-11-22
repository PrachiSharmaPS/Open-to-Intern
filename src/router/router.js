const express = require('express');
const router = express.Router();
const collegeController = require('../controller/collegeController');
const internController = require('../controller/internController');

//api
router.post('/functionUp/colleges', collegeController.createCollege)
router.post('/functionUp/Interns', internController.createInterns)
router.get('/functionUp/Colleges', collegeController.collegeDetails)
router.all("/*",function(req,res){
    res.status(404).send({msg:"invalid http request"})
})


module.exports = router;

