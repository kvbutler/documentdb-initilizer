#!/usr/bin/env node

var fs = require('fs');
var program = require('commander');
var json5 = require('json5');
var lib = require('./lib/lib.js');
var validator = require('./lib/validator.js');

var configFile = '';

program.arguments('<config>').action(function (config) {
    configFile = config;
}).parse(process.argv);

var dir = process.cwd();

configFile = dir + '/' + configFile;

console.log("Config: %s", configFile);
console.log(" ");
if (!fileExists(configFile)) {
    console.error("Invalid config file.")
    process.exit(1);
}

var fileContent = fs.readFileSync(configFile, 'utf-8');
var config = json5.parse(fileContent);

if (!validator.validateConfig(config))
    process.exit(1);

config.storedProcsPath =  dir + '/' + config.storedProcsPath;

displayConfig(config);

if (config.storedProcPath && config.storedProcPath !== "")
    lib.createStoredProcs(config.storedProcPath, config);
else
    console.log("Skip process stored procs...");

if (config.triggerPath && config.triggerPath !== "")
    lib.createTriggers(config.triggerPath, config);
else
    console.log("Skip process triggers...");

if (config.documentPath && config.documentPath !== "")
    lib.createDocuments(config.documentPath, config);
else
    console.log("Skip process documents...");

if (config.userDefinedFunctionPath && config.userDefinedFunctionPath !== "")
    lib.createUserDefinedFunctions(config.userDefinedFunctionPath, config);
else
    console.log("Skip process user defined functions...");

function displayConfig(config){
    console.log("Database Url: " + config.url);
    console.log("Key: " + config.key);
    console.log("Database: " + config.database);
    console.log("Colelction: " + config.collection);
    console.log("StoredProc Path: " + config.storedProcPath);
    console.log("Trigger Path: " + config.triggerPath);
    console.log("Document Path: " + config.documentPath);
    console.log("UserDefinedFunctionPath Path: " + config.userDefinedFunctionPath);
}

function fileExists(filePath)
{
    try
    {
        return fs.statSync(filePath).isFile();
    }
    catch (err)
    {
        return false;
    }
}