describe("lib test", function () {

    var testConfig = {};

    it("should load objects from file", function (done) {
        //leave fs not mcoked on purpose. Want to check if the file system actually work.
        var fs = require('fs');
        var lib = require('../lib/lib.js');
        var dir = process.cwd() + '/spec/testFiles';

        var objs = lib.loadFiles(dir);

        expect(objs.length).toBe(3);
        expect(objs[0].id).toBe("helloWorld");
        expect(objs[0].body).not.toBe(null);
        expect(objs[1].body).not.toBe(null);
        expect(objs[2].body).not.toBe(null);

        done();
    })

    it("should try to save stored procs", function (done) {

        var proxyquire = require('proxyquire')
        var core = require('../lib/core.js');
        var lib = proxyquire('../lib/lib.js', { './core.js': core });
        var dir = 'testDir';
        var storedProcs = [{
            id: "helloWorld",
            serverScript: function () {
                var context = getContext();
                var response = context.getResponse();

            }
        },
            {
                id: "helloWorld2",
                serverScript: function () {
                    var context = getContext();
                    var response = context.getResponse();
                }
            }];

        spyOn(lib, "loadFiles").and.returnValue(storedProcs);

        spyOn(core, 'saveStoredProc');

        lib.createStoredProcs(dir, testConfig);

        expect(lib.loadFiles).toHaveBeenCalledWith(dir);
        expect(core.saveStoredProc).toHaveBeenCalledWith(storedProcs[0], testConfig);
        expect(core.saveStoredProc.calls.count()).toBe(storedProcs.length);

        done();
    })

    it("should try to save triggers", function (done) {

        var proxyquire = require('proxyquire')
        var core = require('../lib/core.js');
        var lib = proxyquire('../lib/lib.js', { './core.js': core });
        var dir = 'testDir';
        var triggers = [{
            id: "helloWorld",
            triggerType: "Pre",
            triggerOperation: "All",
            serverScript: function () {
                var context = getContext();
                var response = context.getResponse();

            }
        },
            {
                id: "helloWorld2",
                triggerType: "Post",
                triggerOperation: "Create",
                serverScript: function () {
                    var context = getContext();
                    var response = context.getResponse();
                }
            }];

        spyOn(lib, "loadFiles").and.returnValue(triggers);

        spyOn(core, 'saveTrigger');

        lib.createTriggers(dir, {});

        expect(lib.loadFiles).toHaveBeenCalledWith(dir);
        expect(core.saveTrigger).toHaveBeenCalledWith(triggers[0], testConfig);
        expect(core.saveTrigger.calls.count()).toBe(triggers.length);

        done();
    })

    it("should try to save userDefinedFunctions", function (done) {

        var proxyquire = require('proxyquire')
        var core = require('../lib/core.js');
        var lib = proxyquire('../lib/lib.js', { './core.js': core });
        var dir = 'testDir';
        var userDefinedFunctions = [{
            id: "helloWorld",
            userDefinedFunctionType: "Javascript",
            serverScript: function () {
                var context = getContext();
                var response = context.getResponse();

                return "";
            }
        },
            {
                id: "helloWorld2",
                userDefinedFunctionType: "Javascript",
                serverScript: function () {
                    var context = getContext();
                    var response = context.getResponse();
                    return "";
                }
            }];

        spyOn(lib, "loadFiles").and.returnValue(userDefinedFunctions);

        spyOn(core, 'saveUserDefinedFunction');

        lib.createUserDefinedFunctions(dir, {});

        expect(lib.loadFiles).toHaveBeenCalledWith(dir);
        expect(core.saveUserDefinedFunction).toHaveBeenCalledWith(userDefinedFunctions[0], testConfig);
        expect(core.saveUserDefinedFunction.calls.count()).toBe(userDefinedFunctions.length);

        done();
    })

    it("should try to save documents", function (done) {

        var proxyquire = require('proxyquire')
        var core = require('../lib/core.js');
        var lib = proxyquire('../lib/lib.js', { './core.js': core });
        var dir = 'testDir';
        var documents = [{
                id: "helloWorld",
                name: "test1"
            },
            {
                id: "helloWorld2",
                name: "test2"
            }];

        spyOn(lib, "loadFiles").and.returnValue(documents);

        spyOn(core, 'saveDocument');

        lib.createDocuments(dir, {});

        expect(lib.loadFiles).toHaveBeenCalledWith(dir);
        expect(core.saveDocument).toHaveBeenCalledWith(documents[0], testConfig);
        expect(core.saveDocument.calls.count()).toBe(documents.length);

        done();
    })

})