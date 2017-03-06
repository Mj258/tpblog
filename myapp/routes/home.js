var express = require('express');
var router = express.Router();

router.post('/home', function(req, res, next) {
	console.log('xiaomao')
	console.log(req.files)
});
module.exports = router;