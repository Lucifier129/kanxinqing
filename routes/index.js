var express = require('express');
var router = express.Router();
var util = require('util')

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', getData('SELECT * FROM defaults'));
});

router.post('/add', (req, res) => {
	var { username, password } = req.body
	var addQL = `INSERT INTO defaults (username, password) VALUES (${ username }, ${ password })`
	dbRun(addQl)
	res.json(getData('SELECT * FROM defaults'))
})

router.post('/delete', (req, res) => {
	var { d_id } = req.body
	var deleteQL = `DELETE FROM defaults WHERE d_id=${ d_id }`
	dbRun(deleteQL)
	res.json(getData('SELECT * FROM defaults'))
})

module.exports = router;

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

// var createQL = `
// CREATE TABLE defaults
// (
// d_id integer PRIMARY KEY AUTOINCREMENT,
// username char,
// password char
// );
// INSERT INTO defaults (username, password) VALUES ('jade', '123');
// INSERT INTO defaults (username, password) VALUES ('lucifier', '456');
// `

// db.run(createQL)

// var data = db.export()
// fs.writeFileSync('test.sqlite', new Buffer(data))

var result = db.exec('SELECT * FROM defaults')
console.log(util.inspect(result[0]))



