const os = require('os');
const buildInPath = require('path');
const fs = require('fs');
const qiniu = require('../util/qiniu');
const Poetry = require('../model/poetry');
const logger = require('../util/logger').logger;

const find = async (ctx, next) => {
	const {id, page=1} = ctx.query;
	const doc = id ? await Poetry.find({_id: id}) : await Poetry.find().limit(page*6);
	if(!doc.errors) {
		logger.log(JSON.stringify(doc));
		ctx.response.body = doc;
	}else {
		logger.errors(JSON.stringify(doc));
		ctx.response.body = {code: 0, message: "find fail!"}
	}
}

const update = async (ctx, next) => {
	const doc = await Poetry.where({_id: '5a9674ff4115f030dc8d2c58'}).update({$set: {topic: 'update topic'}})
	if(!doc.errors) {
		ctx.response.body = {code: 1, message: "update ok!", data: doc}
	}else {
		ctx.response.body = {code: 0, message: "update fail!"}
	}
}

const remove = async (ctx, next) => {
	const {id} = ctx.request.body;
	console.log(id)
	const doc = await Poetry.where({_id: id}).remove();
	// 删除七牛云上图片
	// const res = await qiniu.deleteQiniu('1520567530942.png');
	// console.log(res)
	if(!doc.errors) {
		ctx.response.body = doc;
	}else {
		ctx.response.body = doc.errors;
	}
}

const add = async (ctx, next) => {
	const {url, topic, description} = ctx.request.body;
	const poetry = new Poetry({
		url: url,
		topic: topic,
		description: description
	});
	const doc = await poetry.save();
	if(!doc.errors) {
		logger.log("add ok");
		ctx.response.body = {code: 1, message: "add ok!", data: doc}
	}else {
		logger.errors(JSON.stringify(doc.errors));
		ctx.response.body = {code: 0, message: "add fail!", data: doc.errors}
	}
}

const upload = async (ctx, next) => {
	const {files, fields} = ctx.request.body;
	const {path, name} = files.file;
	console.log(path)
	// 创建stream流
	const reader = fs.createReadStream(path);
	// 使用时间戳重新命名
	// const fileName = new Date().getTime() + buildInPath.extname(name);
	// 上传
	const res = await qiniu.uploadQiniu(reader, name);
	console.log(res)
	const {statusCode, data} = res[1];
	if(statusCode) {
		console.info(data.key + "上传成功！");
		logger.info(data.key + "上传成功！");
		ctx.response.body = data.key;
	}else {
		logger.errors(fileName + "上传失败！");
		ctx.response.body = '上传失败';
	}
}


module.exports = {
	'GET /find': find,
	'POST /poetry/add': add,
	'GET /update': update,
	'POST /remove': remove,
	'POST /upload': upload
};