const Koa = require('koa');
const https = require('https');
const http = require('http');
const fs = require('fs');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
const convert = require('koa-convert');

const app = new Koa();
const controller = require('./src/util/controller');

const key = fs.readFileSync('./cerificate/cert.key');
const cert = fs.readFileSync('./cerificate/cert.pem')

const PORT = 3000;
const SSLPORT = 3001;

// 1. import 'mongodse connect'
require('./src/util/mongodbConnection');
// 2. import 'Poetry' Model
// const Poetry = require('./src/model/poetry');
// // 3. defined 'Poetry' Entity
// const poetry = new Poetry({
// 	url: '1.jpg',
// 	topic: 'zxd',
// 	description: 'qazewdsfsdfsfsadfxc'
// });
// // 4. CRUL
// poetry.save(function(err, doc) {
// 	if(err) {
// 		console.log('save error: ' + err);
// 	}
// 	console.log('save success: \n' + doc);
// });

app.use(convert(koaLogger()));
app.use(bodyParser());
app.use(controller());

try {
	https.createServer({key: key, cert: cert}, app.callback()).listen(SSLPORT);
	app.listen(PORT);
}catch(e) {
	console.log(e)
}


