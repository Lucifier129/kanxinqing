var express = require('express');
var router = express.Router();
var util = require('util')

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'home page'
	});
});

module.exports = router;



