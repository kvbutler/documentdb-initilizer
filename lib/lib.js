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
            var f = new Function(fileContent + "; return objs;");
            var objs = f();
            if (!objs){
                throw new Error('Invalid file ' + name);
            }

            if (Array.isArray(objs)){
                result = result.concat(objs);
            }else{
                result.push(objs);
            }
            
        }
    }
    return result;
} 

exports.dropCollection = function(config) {
	return core.dropCollection(config);
}

exports.createCollection = function(config) {
	return core.createCollection(config);
}

exports.createStoredProcs = function(dir, config) {
    createDbObjects(dir, config, core.saveStoredProc);
} 

exports.createTriggers = function(dir, config) {
    createDbObjects(dir, config, core.saveTrigger);
} 

exports.createUserDefinedFunctions = function(dir, config) {
    createDbObjects(dir, config, core.saveUserDefinedFunction);
} 

exports.createDocuments = function(dir, config) {
    createDbObjects(dir, config, core.saveDocument);
}

function createDbObjects(dir, config, saveFunction){
    var objs = exports.loadFiles(dir);
    for (var i = 0; i < objs.length; i++) {
        var obj = objs[i];

        saveFunction(obj, config);
    }
}