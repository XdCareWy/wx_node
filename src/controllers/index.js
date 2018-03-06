const os = require('os');
const path = require('path');
const fs = require('fs');
const qiniu = require('../util/qiniu');

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
			<input type="file" name="file" />
			<input type="submit" value="submit" />
		</form>
	`;
}

// 包装方法wrap，入参为待包装的异步函数
function wrap(func) {
    //包装函数返回的新函数在执行时，将会返回一个Promise对象，
    return function() {
        return new Promise((resolve,reject) => {
            arguments[arguments.length++] = function(err, ...rest) {
                if(err) {
                    reject(err);
                }
                //异步回掉进入的时候将异步结果resolve回去
                resolve(rest);
            }
            //此处可以看出包装函数在执行时实际上还是执行原来的异步函数func,只是对arguments做了修改
            func.apply(this,arguments)
        })
    }
}

const upload = async (ctx, next) => {
	// if ('POST' != ctx.request.method) return await next();
  	const file = ctx.request.body.files.file;
  	const reader = fs.createReadStream(file.path);
  	const fileName = new Date().getTime() + path.extname(file.name);
  // 	const stream = fs.createWriteStream(__dirname + "/../../upload/" + new Date().getTime() + path.extname(file.name));
  // 	reader.pipe(stream);
 	// console.log('uploading %s -> %s', file.name, stream.path)
 	const res = wrap(qiniu.uploadQiniu)
 	const r = await res(reader, fileName);
 	console.log(r)

 	// qiniu.uploadQiniu(reader, fileName, (respErr, respBody, respInfo) => {
		// if (respErr) {
		// 	throw respErr;
		// }
		// if (respInfo.statusCode == 200) {
		// 	console.log(respBody);
		// } else {
		// 	console.log(respInfo.statusCode);
		// 	console.log(respBody);
		// }
 	// });
	ctx.body = {
		data: r
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