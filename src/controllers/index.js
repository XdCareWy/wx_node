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
	ctx.body = `
		<form action="http://localhost:3000/upload" enctype="multipart/form-data" method="post">
			<input type="file" name="file" />
			<input type="submit" value="submit" />
		</form>
	`;
}

const upload = async (ctx, next) => {
	console.log(ctx.request.body.files.file)
	console.log(next)

	ctx.body = {
		data: ctx
	}
}

const info = async (ctx, next) => {
	const data = require(__dirname + "/../model/data.json");
	buildJson(ctx, data);
}

const detail = async (ctx, next) => {
	const data = require(__dirname + "/../model/data.json");
	console.log(ctx)
}

const buildJson = (ctx, data) => {
	ctx.response.type = 'application/json';
	ctx.response.body = {
		code: 200,
		msg: 'ok',
		data: data
	}
}


module.exports = {
	'GET /': index,
	'POST /assign': assign,
	'GET /info': info,
	'GET /uploadHtml': uploadHtml,
	'POST /upload': upload
};