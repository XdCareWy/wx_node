const index = async (ctx, next) => {
	ctx.body = `
		<h1>Index</h1>
		<form action="/assign" method="post">
			<p>Name: <input type="text" name="username" /></p> <br />
			<p>Password: <input type="password" name="password" /></p> <br />
			<p><input type="submit" value="Submit" /></p>
		</form>
	`;
}

const assign = async (ctx, next) => {
	const username = ctx.request.body.username;
	const password = ctx.request.body.password;
	console.log(`username: ${username}, password: ${password}`)
	if(username === 'zxd' && password === "123") {
		ctx.body = `<h1>Welcome, ${username}</h1>`;
	}else {
		ctx.body = `<h1>Login failed!</h1>
			<p><a href="/">Try again!</a></p>
		`;
	}
}

const uploadHtml = async (ctx, next) => {
	await next();
	ctx.body = `
		<form action="/upload" enctype="multipart/form-data" method="post">
			<input type="file" name="files"/>
			<input type="submit" value="submit" />
		</form>
	`;
}

const upload = async (ctx, next) => {
	// if ('POST' != ctx.request.method) return await next();
  	// const file = ctx.request.body.files.file;
	console.log(ctx.request.body)
	ctx.body = {
		data: ctx.request.body
	}
}

const info = async (ctx, next) => {
	const data = require(__dirname + "/../model/data.json");
	buildJson(ctx, data);
}

const detail = async (ctx, next) => {
	const data = require(__dirname + "/../model/data.json");
	console.log(ctx)
	console.log(ctx.query)
}

const buildJson = (ctx, data) => {
	ctx.response.type = 'application/json';
	ctx.response.body = {
		code: 200,
		msg: 'ok',
		data: data
	}
}

const add = async (ctx, next) => {
	const {url, topic, description} = ctx.request.body;
	const Poetry = require('../model/poetry');
	const poetry = new Poetry({
		url: url,
		topic: topic,
		description: description
	});
	const doc = await poetry.save()
	if(!doc.errors) {
		ctx.response.body = {code: 1, message: "add ok!"}
	}else {
		ctx.response.body = {code: 0, message: "add fail!"}
	}
}

const find = async (ctx, next) => {
	const Poetry = require('../model/poetry');
	const doc = await Poetry.find();
	if(!doc.errors) {
		ctx.response.body = {code: 1, message: "find ok!", data: doc}
	}else {
		ctx.response.body = {code: 0, message: "find fail!"}
	}
}

const update = async (ctx, next) => {
	const Poetry = require('../model/poetry');
	const doc = await Poetry.where({_id: '5a9674ff4115f030dc8d2c58'}).update({$set: {topic: 'update topic'}})
	if(!doc.errors) {
		ctx.response.body = {code: 1, message: "update ok!", data: doc}
	}else {
		ctx.response.body = {code: 0, message: "update fail!"}
	}
}

const remove = async (ctx, next) => {
	const Poetry = require('../model/poetry');
	const doc = await Poetry.where({_id: "5a9661df88792c25570049b9"}).remove();
	if(!doc.errors) {
		ctx.response.body = {code: 1, message: "delete ok!", data: doc}
	}else {
		ctx.response.body = {code: 0, message: "delete fail!"}
	}
}

module.exports = {
	'GET /': index,
	'POST /assign': assign,
	'GET /info': info,
	'GET /uploadHtml': uploadHtml,
	'POST /upload': upload,
	'GET /detail': detail,
	'GET /find': find,
	'POST /add': add,
	'GET /update': update,
	'GET /remove': remove
};