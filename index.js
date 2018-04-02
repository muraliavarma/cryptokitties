const express = require('express')
const fs = require('fs')
const moment = require('moment')
const app = express()

app.use('/', express.static('dist'))

app.get('/transfer/:transferType/kittenId/:kittenId/tx/:tx/from/:from/to/:to', (req, res) => {
	var stream = fs.createWriteStream('transfer_' + req.params.transferType + '.txt', {flags:'a'});
	stream.write(req.params.from + '|' + req.params.to + '|' + req.params.tx + '|' + req.params.kittenId + '|' + moment().format() + '\n');
	stream.end();
	res.send({
		success: true
	})
})

app.get('/transactions/:from', (req, res) => {
	fs.readFile('transfer_success.txt', 'utf8', (err, data) => {
		if (err) throw err;
		let transactions = data.split('\n');
		let ret = [];
		console.log(req.params.from)
		transactions.forEach(transaction => {
			var part = transaction.split('|');
			if (part[0] == req.params.from) {
				ret.push({
					to: part[1],
					tx: part[2],
					kittenId: part[3],
					ts: part[4]
				})
			}
		})
		res.send({
			'transactions': ret
		})
	})
})

app.listen(3000, () => console.log('App is listening on port 3000!'))
