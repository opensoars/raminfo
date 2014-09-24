var assert = require('assert');

var raminfo = require('./../index.js');

describe('requie', function (){
  it('should return an object', function (){
    assert.equal('object', typeof raminfo);
  });
});

/*

describe('raminfo.set', function (){
  it('should succesfuly', function (){
    
  });
});
*/

/*
raminfo.set({
  
  // Used so we can do some benchmarks
  gc: global.gc || undefined,

  // Where to dump the memory information
  dumpDir: __dirname + './raminfoDump',

  // Log when dumping a file
  logDumpFile: false

});
*/