const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;

db.on('error', error => console.log('mongodb connect fail: ' + error));
db.once('open', () => console.log('mongodb connect success!'));
