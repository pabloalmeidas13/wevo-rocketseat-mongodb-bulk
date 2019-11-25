'use strict'
const express = require("express");
const router = express.Router();

const controller = require('../controllers/controller');

const headerValidation = (req,res,next) =>{
    if(!req.header('myname'))
    {
        res.status(401).json({E: "Header 'myname' not found!"});
    }
    else
    {
        next();
    }
};

router.post('/mongoDBInsert', headerValidation, controller.insertOneByOne);

router.post('/mongoDBInsertMany', headerValidation, controller.insertMany);

router.post('/mongoDBInsertBulk', headerValidation, controller.insertBulk);

module.exports = router;