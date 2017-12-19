const express = require('express');
const board = require('./board');
const authen = require('./authen');

const router = express.Router();


router.use('/board',board);     //  /api/board/~
router.use('/authen',authen);   //  /api/authen/~

module.exports = router;