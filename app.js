const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const controller = require('./src/util/controller');


app.use(bodyParser());
app.use(controller());

app.listen(80);
console.log("server is listenning port 3000!")