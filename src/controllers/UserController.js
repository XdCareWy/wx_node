const axios = require('axios');
const logger = require('../util/logger').logger;
const exec = require('child_process').exec;

const onLogin = async (ctx, next) => {
	const appid= "wxfee1870c5ce391de";
	const secret = "df3413875c5e0ab6f9379c8a7721073e";
	const {js_code} = ctx.request.body;
	const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${js_code}&grant_type=authorization_code`;

	const res = await axios.get(url);
	const data = res.data;
	if('errcode' in data) {
		logger.error(JSON.stringify(data));
		ctx.response.body = {
			code: data.errcode, 
			msg: data.errmsg
		};
	}else {
		const {session_key, openid} = data;
		ctx.response.body = {
			code: 200,
			data: {
				session_key, 
				openid
			}
		};
	}
};

const readFile = async (ctx, next) => {
	exec('head -n 80 /dev/urandom | tr -dc A-Za-z0-9 | head -c 128', function(err,stdout,stderr){
		console.log(stdout)
	});
};

module.exports = {
	'POST /login': onLogin,
	'GET /read': readFile
};