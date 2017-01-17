describe("lib test", function () {

    it("should load objects from file", function (done) {
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

    it("should save store proc", function (done) {

        var proxyquire =  require('proxyquire')
        var core = require('../lib/core.js');
        var lib = proxyquire('../lib/lib.js', { './core.js': core});
        var dir = process.cwd() + '/spec/testFiles';
        var storeProcs = [
            {id:"1"},{id:"2"},{id:"3"}
        ]
        
        spyOn(core, 'saveStoreProc');        



        done();
    })

})