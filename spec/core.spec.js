
var $q = require('q');

describe("core test", function () {
    var testConfig = {};
    var fakeClient = {};
    var testLink = "testLink";
    var storedProc = {
        id: "helloWorld",
        serverScript: function () {
            var context = getContext();
            var response = context.getResponse();

            response.setBody("Hello, World");
        }
    };
    var trigger = {
        id: "helloWorld",
        triggerType: "Pre",
        triggerOperation: "All",
        serverScript: function () {
            var context = getContext();
            var response = context.getResponse();
        }
    }
    var userDefinedFunction = {
        id: "helloWorld",
        userDefinedFunctionType: "Javascript",
        serverScript: function () {
            var context = getContext();
            var response = context.getResponse();

            return "";        
        }
    }
    var document = {
        id: "helloWorld",
        name: "test"
    }

    beforeEach(function () {
        testConfig = {
            url: "http://test.com",
            key: "dbkey",
            database: "",
            collection: "collectionId"
        }

        fakeClient = {};
    });

    it("should get client correctly", function (done) {
        var core = require('../lib/core.js');
        var client = core.getClient(testConfig);

        expect(client.urlConnection).toEqual(testConfig.url);

        done();
    })

    it("should get colelction link correctly", function (done) {
        var core = require('../lib/core.js');

        var result = core.getCollectionlink(testConfig);

        expect(result).toEqual("dbs/" + testConfig.database + "/colls/" + testConfig.collection);

        done();
    })

    it("should try to save one stored proc", function (done) {
        var core = require('../lib/core.js');
        var testId = storedProc.id;
        prepareCommonSpies(core);
        fakeClient.upsertStoredProcedureAsync = function (obj, config) {
            var deferred = $q.defer();
            setTimeout(function () {
                deferred.resolve({
                    resource: {
                        id: testId
                    }
                });
            }, 200);

            return deferred.promise;
        }
        spyOn(fakeClient, "upsertStoredProcedureAsync").and.callThrough();

        core.saveStoredProc(storedProc, {});

        expect(fakeClient.upsertStoredProcedureAsync).toHaveBeenCalledWith(testLink, storedProc);

        setTimeout(function () {
            expect(console.log).toHaveBeenCalledWith("Successfully created storedProc: " + testId);

            fakeClient.upsertStoredProcedureAsync.calls.reset();
            console.log.and.stub();
            done();

        }, 500);

    })

    it("should try to save one trigger", function (done) {
        var core = require('../lib/core.js');
        var testId = trigger.id;
        prepareCommonSpies(core);
        fakeClient.upsertTriggerAsync = function (obj, config) {
            var deferred = $q.defer();
            setTimeout(function () {
                deferred.resolve({
                    resource: {
                        id: testId
                    }
                });
            }, 200);

            return deferred.promise;
        }
        spyOn(fakeClient, "upsertTriggerAsync").and.callThrough();

        core.saveTrigger(trigger, {});

        expect(fakeClient.upsertTriggerAsync).toHaveBeenCalledWith(testLink, trigger);

        setTimeout(function () {
            expect(console.log).toHaveBeenCalledWith("Successfully created trigger: " + testId);

            fakeClient.upsertTriggerAsync.calls.reset();
            console.log.and.stub();
            done();

        }, 500);

    })

    it("should try to save one userDefinedFunction", function (done) {
        var core = require('../lib/core.js');
        var testId = userDefinedFunction.id;
        prepareCommonSpies(core);
        fakeClient.upsertUserDefinedFunctionAsync = function (obj, config) {
            var deferred = $q.defer();
            setTimeout(function () {
                deferred.resolve({
                    resource: {
                        id: testId
                    }
                });
            }, 200);

            return deferred.promise;
        }
        spyOn(fakeClient, "upsertUserDefinedFunctionAsync").and.callThrough();

        core.saveUserDefinedFunction(userDefinedFunction, {});

        expect(fakeClient.upsertUserDefinedFunctionAsync).toHaveBeenCalledWith(testLink, userDefinedFunction);

        setTimeout(function () {
            expect(console.log).toHaveBeenCalledWith("Successfully created userDefinedFunction: " + testId);

            fakeClient.upsertUserDefinedFunctionAsync.calls.reset();
            console.log.and.stub();
            done();

        }, 500);

    })

    it("should try to save one document", function (done) {
        var core = require('../lib/core.js');
        var testId = document.id;
        prepareCommonSpies(core);
        fakeClient.upsertDocumentAsync = function (obj, config) {
            var deferred = $q.defer();
            setTimeout(function () {
                deferred.resolve({
                    resource: {
                        id: testId
                    }
                });
            }, 200);

            return deferred.promise;
        }
        spyOn(fakeClient, "upsertDocumentAsync").and.callThrough();

        core.saveDocument(document, {});

        expect(fakeClient.upsertDocumentAsync).toHaveBeenCalledWith(testLink, document);

        setTimeout(function () {
            expect(console.log).toHaveBeenCalledWith("Successfully created document: " + testId);

            fakeClient.upsertDocumentAsync.calls.reset();
            console.log.and.stub();
            done();

        }, 500);

    })

    function prepareCommonSpies(core) {
        spyOn(core, "getClient").and.returnValue(fakeClient);
        spyOn(core, "getCollectionlink").and.returnValue(testLink);
        spyOn(console, "log");
    }

})