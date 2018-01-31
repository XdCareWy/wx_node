const fs = require('fs');

function addControllers(router, dir) {
	// get all files in controllers
	console.log(__dirname)
	const files = fs.readdirSync(__dirname + '/../' + dir);
	// filter js files
	const jsFiles = files.filter(item => item.endsWith('.js'));

	jsFiles.forEach(item => {
		console.log(`process controller: ${item}`);
		const mapping = require(__dirname + `/../${dir}/` + item);
		addMapping(mapping, router);
	});
}

function addMapping(mapping, router) {
	for(let url in mapping) {
		if(url.startsWith('GET ')) {
			router.get(url.substring(4), mapping[url]);
		}else if(url.startsWith('POST ')) {
			router.post(url.substring(5), mapping[url]);
		}else {
			console.log(`invalid URL: ${url}`);
		}
	}	
}

module.exports = function(dir) {
	const controllerDir = dir || 'controllers';
	const router = require('koa-router')();
	addControllers(router, controllerDir);
	return router.routes();
}