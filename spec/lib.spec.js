var fs = require('fs');
var lib = require("../lib/lib.js")

describe("lib test", function () {

    it("should load objects from file", function (done) {

        var dir = process.cwd() + '/spec/testFiles';

        var objs = lib.loadFiles(dir);

        expect(objs.length).toBe(1);
        expect(objs[0].id).toBe("helloWorld");
        expect(objs[0].body).not.toBe(null);
    
        done();
    })

})