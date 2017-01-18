#!/usr/bin/env node

var fs = require('fs');
var program = require('commander');
var json5 = require('json5');
var lib = require('./lib/lib.js');
var validator = require('./lib/validator.js');
var colors = require('colors/safe');


var configFile = '';

program.arguments('<config>').action(function (config) {
    configFile = config;
}).parse(process.argv);

var dir = process.cwd();

configFile = dir + '/' + configFile;

console.log(colors.green("Config: " + configFile));
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
    console.log(colors.yellow("Skip process stored procs..."));

if (config.triggerPath && config.triggerPath !== "")
    lib.createTriggers(config.triggerPath, config);
else
    console.log(colors.yellow("Skip process triggers..."));

if (config.documentPath && config.documentPath !== "")
    lib.createDocuments(config.documentPath, config);
else
    console.log(colors.yellow("Skip process documents..."));

if (config.userDefinedFunctionPath && config.userDefinedFunctionPath !== "")
    lib.createUserDefinedFunctions(config.userDefinedFunctionPath, config);
else
    console.log(colors.yellow("Skip process user defined functions..."));

function displayConfig(config){
    console.log(colors.green("Database Url: " + config.url));
    console.log(colors.green("Key: " + config.key));
    console.log(colors.green("Database: " + config.database));
    console.log(colors.green("Colelction: " + config.collection));
    console.log(colors.magenta("StoredProc Path: " + config.storedProcPath));
    console.log(colors.magenta("Trigger Path: " + config.triggerPath));
    console.log(colors.magenta("Document Path: " + config.documentPath));
    console.log(colors.magenta("UserDefinedFunctionPath Path: " + config.userDefinedFunctionPath));
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