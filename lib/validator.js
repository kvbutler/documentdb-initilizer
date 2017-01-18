var Validator = require('jsonschema').Validator;
var json5 = require('json5');
var fs = require("fs");


var fileContent = fs.readFileSync(__dirname + "/config-schema.json", 'utf-8');
var configSchema = json5.parse(fileContent);

var exports = module.exports;

var v = new Validator();

exports.validateConfig = function(json){
    var result = v.validate(json, configSchema);

    if (result.valid){
        return true;
    }else{
        console.error(result);
        return false;
    }
}


