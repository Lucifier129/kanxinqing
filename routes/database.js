var express = require('express');
var router = express.Router();
var util = require('util')

var fs = require('fs')
var SQL = require('sql.js')
var dbBuffer = fs.readFileSync('test.sqlite')
var db = new SQL.Database(dbBuffer)
var dbRun = ql => {
	db.run(ql)
	fs.writeFileSync('test.sqlite', new Buffer(db.export()))
}
var dbExec = ql => db.exec(ql)
var getData = ql => {
	var data = dbExec('SELECT * FROM defaults')
	return {
		data: JSON.stringify(data[0])
	}
}

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('database', getData('SELECT * FROM defaults'));
});

router.post('/query', (req, res) => {
	dbRun(req.body.query)
	res.json({
		data: JSON.parse(getData('SELECT * FROM defaults').data)
	})
})

module.exports = router;



