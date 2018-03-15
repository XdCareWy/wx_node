const mongoose = require('mongoose');
const logger = require('../util/logger').logger;

mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;

db.on('error', error => logger.error('mongodb connect fail: ' + error));
db.once('open', () => logger.info('mongodb connect success!'));
