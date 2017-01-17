var fs = require('fs');
var core = require('./core.js');

var exports = module.exports;

exports.loadFiles = function (dir){
    var result = [];
    var files = fs.readdirSync(dir);

    for (var i in files) {
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isFile()) {
            var fileContent = fs.readFileSync(name, 'utf-8');
            var f = new Function("var x=" + fileContent + "; return x;");
            var objs = f();
            if (Array.isArray(objs)){
                result = result.concat(objs);
            }else{
                result.push(objs);
            }
            
        }
    }
    return result;
} 

exports.createStoreProcs = function(dir) {
    var storeProcs = exports.loadFiles(dir);

    for (var i = 0; i < storeProcs.length; i++) {
        var storeProc = storeProcs[i];

        core.saveStoreProc(storeProc);
    }

} 

