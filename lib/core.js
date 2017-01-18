var DocumentClient = require('documentdb-q-promises').DocumentClientWrapper;
var _client = undefined;
var exports = module.exports;

exports.saveStoreProc = function (storeProc, config) {
    var client = exports.getClient(config);
    var collectionLink = exports.getCollectionlink(config);
    client.upsertStoredProcedureAsync(collectionLink, storeProc)
    .then(function (response) {
        console.log("Successfully created stored procedure: " + response.resource.id);
    }, function (error) {
        console.log("Error: ", error);
    });
}

exports.saveTrigger = function (trigger, config) {
    var client = exports.getClient(config);
    var collectionLink = exports.getCollectionlink(config);
    client.upsertTriggerAsync(collectionLink, trigger)
    .then(function (response) {
        console.log("Successfully created trigger: " + response.resource.id);
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