const Koa = require('koa');
const https = require('https');
const http = require('http');
const fs = require('fs');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const controller = require('./src/util/controller');

const key = fs.readFileSync('./cerificate/cert.key');
const cert = fs.readFileSync('./cerificate/cert.pem')

const PORT = 3000;
const SSLPORT = 3001;

app.use(bodyParser());
app.use(controller());

https.createServer({key: key, cert: cert}, app.callback()).listen(SSLPORT);
app.listen(PORT);


