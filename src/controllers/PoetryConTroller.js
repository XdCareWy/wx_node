const fs = require('fs');
const qiniu = require('../util/qiniu');
const Poetry = require('../model/poetry');
const logger = require('../util/logger').logger;

const find = async(ctx, next) => {
    const {id, page = 1} = ctx.query;
    let doc = "";
    if(id) {
        logger.info("查询的id： " + id, "page: " + page);
        doc = await Poetry.find({_id: id});
    }else {
        doc = await Poetry.find().limit(page * 6);
    }

    try{
        if(!doc.errors) {
            logger.info(doc);
            ctx.response.body = doc;
        } else {
            logger.error(doc.errors);
            ctx.response.body = {code: 0, message: "find fail!"}
        }
    }catch(e) {
        logger.info("查询出错：");
        logger.error(e);
    }
};

const update = async(ctx, next) => {
    const doc = await Poetry.where({_id: '5a9674ff4115f030dc8d2c58'}).update({$set: {topic: 'update topic'}})
    if(!doc.errors) {
        ctx.response.body = {code: 1, message: "update ok!", data: doc}
    } else {
        ctx.response.body = {code: 0, message: "update fail!"}
    }
};

const remove = async(ctx, next) => {
    const {id} = ctx.request.body;
    try {
        logger.info("删除的id： " + id);
        const doc = await Poetry.where({_id: id}).remove();
        // todo: 删除七牛云上图片 1. 根据id查到图片的url 2. 删除七牛云上的url
        // const res = await qiniu.deleteQiniu('1520567530942.png');
        // console.log(res)
        if(!doc.errors) {
            ctx.response.body = doc;
        } else {
            logger.error(doc.errors);
            ctx.response.body = doc.errors;
        }
    } catch(e) {
        logger.error(e);
    }
};

const add = async(ctx, next) => {
    const {url, topic, description} = ctx.request.body;
    const poetry = new Poetry({
        url: url,
        topic: topic,
        description: description
    });
    try {
        const doc = await poetry.save();
        logger.log("添加信息返回结果：");
        logger.info(doc);
        if(!doc.errors) {
            ctx.response.body = {code: 1, message: "add ok!", data: doc}
        } else {
            logger.error(doc.errors);
            ctx.response.body = {code: 0, message: "add fail!", data: doc.errors}
        }
    } catch(e) {
        logger.error(e);
    }
};

const upload = async(ctx, next) => {
    const {files} = ctx.request.body;
    const {path, name} = files.file;
    // 创建stream流
    const reader = fs.createReadStream(path);
    // 使用时间戳重新命名
    // const fileName = new Date().getTime() + buildInPath.extname(name);
    // 上传
    try {
        const res = await qiniu.uploadQiniu(reader, name);
        logger.info("七牛云返回信息如下：");
        logger.info(res);
        const {statusCode, data} = res[1];
        if(statusCode) {
            logger.info(data);
            ctx.response.body = data.key;
        } else {
            logger.error("上传失败！");
            ctx.response.body = '上传失败';
        }
    } catch(e) {
        logger.error(e);
    }
};


module.exports = {
    'GET /find': find,
    'POST /poetry/add': add,
    'GET /update': update,
    'POST /remove': remove,
    'POST /upload': upload
};