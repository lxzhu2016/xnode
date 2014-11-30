var fs = require('fs');

// 1. if file foo.txt exists, rename to bar.txt
// 2. write something to bar.txt
// 3. rename bar.txt to foo.txt
var foo = process.cwd() + '/foo.txt';
var bar = process.cwd() + '/bar.txt'
fs.exists(foo, function(exists) {
	if (exists) {
		console.log("file foo.txt exists.");
		fs.rename(foo, bar, function(e1) {
			if (e1) {
				console.log(e1);
			} else {
				console.log("rename file foo.txt to bar.txt.");
				var buf = new Buffer("hello world!", "utf8");

				fs.open(bar, "a", "0666", function(e2, fd) {
					if (e2) {
						console.log(e2);
					} else {
						console.log("open file bar.txt");
						fs.write(fd, buf, 0, buf.length,null, function(e3) {
							if (e3) {
								console.log(e3);
							} else {
								console.log("write data to file bar.txt");
								fs.close(fd, function(e4) {
									if (e4) {
										console.log(e4);
									} else {
										console.log("close file bar.txt");
									}

								});
							}
						});
					}
				});
			}
		});
	} else {
		console.log("file " + foo + " does not exist.");
	}
});