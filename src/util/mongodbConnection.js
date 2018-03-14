const mongoose = require('mongoose');
const logger = require('../util/logger').logger;

mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;

db.on('error', error => logger.log('mongodb connect fail: ' + error));
db.once('open', () => logger.error('mongodb connect success!'));
