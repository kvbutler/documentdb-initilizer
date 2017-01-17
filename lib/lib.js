var fs = require('fs');

var exports = module.exports;

exports.loadFiles = function (dir){
    var result = [];
    var files = fs.readdirSync(dir);

    for (var i in files) {
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isFile()) {
            var fileContent = fs.readFileSync(name, 'utf-8');
            var f = new Function(fileContent);
            var obj = f();
            result.push(obj);
        }
    }
    return result;
} 

