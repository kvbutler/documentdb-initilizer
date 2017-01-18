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

exports.saveDocument = function (document, config) {
    saveDbObj(document, config, "document");
}

//type: document, storedProc, trigger, userDefinedFunction
function saveDbObj(obj, config, type){
    var client = exports.getClient(config);
    var collectionLink = exports.getCollectionlink(config);
    
    var promise = undefined;
    //can't use functor for DocumentClient functions since there is a this reference internally.
    switch(type) {
        case "storedProc":
            promise = client.upsertStoredProcedureAsync(collectionLink, obj);
            break;
        case "trigger":
            promise = client.upsertTriggerAsync(collectionLink, obj);
            break;
        case "userDefinedFunction":
            promise = client.upsertUserDefinedFunctionAsync(collectionLink, obj);
            break;
        case "document":
            promise = client.upsertDocumentAsync(collectionLink, obj);
            break;
    }

    if (!promise) {
        throw new Error("Invalid type");
    }

    promise.then(function (response) {
        console.log("Successfully created "+ type +": " + response.resource.id);
    }, function (error) {
        console.log("Fail to create: " + obj.id);
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