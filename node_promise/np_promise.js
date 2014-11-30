var Promise = require('promise');
var fs = require('fs');

var exists = function(filepath) {
	return new Promise(function(resolve, reject) {
		console.log("fs.exists");
		fs.exists(filepath, function(exists) {
			resolve(exists);
		});
	});
}

var rename = function(oldpath, newpath) {
	return new Promise(function(resolve, reject) {
		console.log("fs.rename");
		fs.rename(oldpath, newpath, function(e) {
			if (e) {
				reject(e);
			} else {

				resolve({});
			}
		})
	});
}

var open = function(filepath, flag, mode) {
	return new Promise(function(resolve, reject) {
		console.log("fs.open");
		fs.open(filepath, flag, mode, function(e, fd) {
			if (e) {
				console.log("fs.open.reject");
				reject(e);
			} else {
				console.log("fs.open.resolve");
				resolve(fd);
			}
		});
	});
}

var write = function(fd, data) {
	return new Promise(function(resolve, reject) {
		console.log("fs.write");
		try {
			fs.write(fd, data, 0, data.length, null, function(e) {
				if (e) {
					console.log("fs.write reject");
					reject(e);
				} else {
					console.log("fs.write resolve");
					resolve(fd);
				}
			})
		} catch (ex) {
			console.log("fs.write exception");
			reject(ex);
		}
	})
}

var close = function(fd) {
	return new Promise(function(resolve, reject) {
		console.log("fs.close");
		fs.close(fd, function(e) {
			if (e) {
				reject(e);
			} else {
				resolve({});
			}
		});
	});
}

var log = function(e) {
	console.log("error:" + e);
}

var foo = process.cwd() + '/foo.txt';
var bar = process.cwd() + '/bar.txt';

exists(foo).then(function() {
	return rename(foo, bar);
}).then(function() {
	return open(bar, "a", 0666);
}).then(function(fd) {
	return write(fd, new Buffer("Hello World", "utf8"));
}).then(close).done(null, log);