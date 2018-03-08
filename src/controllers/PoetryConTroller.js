const os = require('os');
const buildInPath = require('path');
const fs = require('fs');
const qiniu = require('../util/qiniu');
const tool = require('../util/tool');
const Poetry = require('../model/poetry');
const logger = require('../util/logger');

const find = async (ctx, next) => {
	const doc = await Poetry.find();
	if(!doc.errors) {
		ctx.response.body = {code: 1, message: "find ok!", data: doc}
	}else {
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
	const doc = await Poetry.where({_id: "5a9661df88792c25570049b9"}).remove();
	if(!doc.errors) {
		ctx.response.body = {code: 1, message: "delete ok!", data: doc}
	}else {
		ctx.response.body = {code: 0, message: "delete fail!"}
	}
}

const add = async (ctx, next) => {
	const {files, fields} = ctx.request.body;
	const {topic, description} = fields;
	const {path, name} = files.file;
	// 创建stream流
  	const reader = fs.createReadStream(path);
  	// 使用时间戳重新命名
  	const fileName = new Date().getTime() + buildInPath.extname(name);
	const qiniuUploadWrap = tool.wrap(qiniu.uploadQiniu)
 	const res = await qiniuUploadWrap(reader, fileName);

 	const {statusCode, data} = res[1];
 	if(statusCode) {
 		console.log(logger)
 		console.info(data.key + "上传成功！");
 		logger.info(data.key + "上传成功！");
 	}else {
 		logger.errors(fileName + "上传失败！");
 	}

	const poetry = new Poetry({
		url: fileName,
		topic: topic,
		description: description
	});
	const doc = await poetry.save();
	if(!doc.errors) {
		ctx.response.body = {code: 1, message: "add ok!", data: doc}
	}else {
		ctx.response.body = {code: 0, message: "add fail!", data: doc.errors}
	}
}


module.exports = {
	'GET /find': find,
	'POST /poetry/add': add,
	'GET /update': update,
	'GET /remove': remove
};