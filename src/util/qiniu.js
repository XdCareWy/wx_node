const qiniu = require('qiniu');
const fs = require('fs');

const accessKey = "k2vAtwVFsVSH6kfL40fXk57XzZpxIqnz4uzkfNDN";
const secretKey = "p5w4k1Cna_d7GBUure5OHqJdbfCJy-20btgkWtcA";


function authInstance() {
	return new qiniu.auth.difest.Mac(accessKey, secretKey);
}