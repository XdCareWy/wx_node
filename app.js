const Koa = require('koa');
const https = require('https');
const http = require('http');
const fs = require('fs');
const koaLogger = require('koa-logger');
const convert = require('koa-convert');
const koaBody = require('koa-body');

const app = new Koa();
const controller = require('./src/util/controller');

const key = fs.readFileSync('./cerificate/cert.key');
const cert = fs.readFileSync('./cerificate/cert.pem')

const PORT = 3000;
const SSLPORT = 3001;

// 1. import 'mongodse connect'
require('./src/util/mongodbConnection');

app.use(convert(koaLogger()));
app.use(koaBody({multipart: true}));
app.use(controller());

try {
	https.createServer({key: key, cert: cert}, app.callback()).listen(SSLPORT);
	app.listen(PORT);
}catch(e) {
	console.log(e)
}


