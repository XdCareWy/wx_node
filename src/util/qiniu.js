const qiniu = require('qiniu');
const fs = require('fs');
const tool = require('./tool');

const accessKey = "k2vAtwVFsVSH6kfL40fXk57XzZpxIqnz4uzkfNDN";
const secretKey = "p5w4k1Cna_d7GBUure5OHqJdbfCJy-20btgkWtcA";

// 生成鉴权对象
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
// 
const options = {
	scope: 'music'
};
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);

const config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z1;

var formUploader = new qiniu.form_up.FormUploader(config);
var putExtra = new qiniu.form_up.PutExtra();

/**
 * @param  {readableStream} 文件流
 * @param  {string} 文件标识
 * @param  {function} 回调函数
 */
function uploadQiniu(readableStream, key, callback) {
	formUploader.putStream(uploadToken, key, readableStream, putExtra, callback);
}


const bucketManager = new qiniu.rs.BucketManager(mac, config);
const bucket = "music";
function deleteQiniu(key, callback, bucket="music") {
	bucketManager.delete(bucket, key, callback);
}

module.exports = {
	uploadQiniu: tool.wrap(uploadQiniu),
	deleteQiniu: tool.wrap(deleteQiniu)
};