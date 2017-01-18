var DocumentClient = require('documentdb-q-promises').DocumentClientWrapper;
var _client = undefined;
var exports = module.exports;



exports.saveStoredProc = function (storedProc, config) {
    saveDbObj(storedProc, config, "storedProc")
}

exports.saveTrigger = function (trigger, config) {
    saveDbObj(trigger, config, "trigger");
}

exports.saveUserDefinedFunction = function (userDefinedFunction, config) {
    saveDbObj(userDefinedFunction, config, "userDefinedFunction");
}

//type: document, storedProc, trigger, userDefinedFunction
function saveDbObj(obj, config, type){
    var client = exports.getClient(config);
    var collectionLink = exports.getCollectionlink(config);
    
    var saveFunction = undefined;

    switch(type) {
        case "storedProc":
            saveFunction = client.upsertStoredProcedureAsync;
            break;
        case "trigger":
            saveFunction = client.upsertTriggerAsync;
            break;
        case "userDefinedFunction":
            saveFunction = client.upsertUserDefinedFunctionAsync;
            break;
        case "document":
            saveFunction = client.upsertDocumentAsync;
            break;
    }

    if (!saveFunction) {
        throw new Error("Invalid type");
    }

    saveFunction(collectionLink, obj)
    .then(function (response) {
        console.log("Successfully created "+ type +": " + response.resource.id);
    }, function (error) {
        console.log("Error: ", error);
    });
}

exports.getClient = function (config) {
    var host = config.url;     
    var masterKey = config.key;
    if (!_client){
 	    _client = new DocumentClient(host, {masterKey: masterKey});
    }
   
    return _client;
}

exports.getCollectionlink = function (config) {
   
    return "dbs/" + config.database + "/colls/" + config.collection;
}