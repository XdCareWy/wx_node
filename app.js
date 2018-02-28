const Koa = require('koa');
const https = require('https');
const http = require('http');
const fs = require('fs');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
const convert = require('koa-convert');
const mongoose = require('mongoose');

const app = new Koa();
const controller = require('./src/util/controller');

const key = fs.readFileSync('./cerificate/cert.key');
const cert = fs.readFileSync('./cerificate/cert.pem')

const PORT = 3000;
const SSLPORT = 3001;

app.use(convert(koaLogger()));
app.use(bodyParser());
app.use(controller());

mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
	console.log('success')
	const kittySchema = mongoose.Schema({name: String});
	kittySchema.methods.speak = function() {
		const greeting = this.name? "Meow name is" + this.name : "I don`t have a name";
		console.log(greeting)
	}
	const Kitten = mongoose.model('Kitten', kittySchema);
	const silence = new Kitten({name: 'Silence'});
	console.log(silence.name)
	silence.save(function(err, silence) {
		if(err) {
			return console.error(err);
		}
		silence.speak();
	});

	Kitten.find(function(err, kittens) {
		if(err) {
			return console.error(err);
		}
		console.log(kittens)
	});

})

try {
	https.createServer({key: key, cert: cert}, app.callback()).listen(SSLPORT);
	app.listen(PORT);
}catch(e) {
	console.log(e)
}


