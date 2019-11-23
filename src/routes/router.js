'use strict'
const express = require("express");
const router = express.Router();

const controller = require('../controllers/controller');

router.post('/mongoDBInsert', controller.insertOneByOne);

router.post('/mongoDBInsertMany', controller.insertMany);

router.post('/mongoDBInsertBulk', controller.insertBulk);

module.exports = router;