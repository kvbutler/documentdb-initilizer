
var $q = require('q');

describe("core test", function () {
    var testConfig = {};
    var fakeClient = {};
    var testLink = "testLink";
    var storeProc = {
        id: "helloWorld",
        serverScript: function () {
            var context = getContext();
            var response = context.getResponse();

            response.setBody("Hello, World");
        }
    };

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

    it("should try to save one store proc", function (done) {
        var core = require('../lib/core.js');
        var testId = storeProc.id;
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

        core.saveStoreProc(storeProc);

        expect(fakeClient.upsertStoredProcedureAsync).toHaveBeenCalledWith(testLink, storeProc);

        setTimeout(function () {
            expect(console.log).toHaveBeenCalledWith("Successfully created stored procedure: " + testId);

            fakeClient.upsertStoredProcedureAsync.calls.reset();
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