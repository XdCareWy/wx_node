const log4js = require('log4js');

log4js.configure({
	appenders: {
		console: {
			type: 'file',
			filename: 'logs/console.log'
		}
	},
	categories: {
		default: {
			appenders: ['console'],
			level: 'info'
		}
	}
});

const logger = log4js.getLogger('console');

module.exports.logger = logger;