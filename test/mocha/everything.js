var assert = require('assert'),
    fs = require('fs');

var raminfo = require('./../../index.js');

var correctDumpDir = __dirname + '/../../raminfoDump'

describe('raminfo', function (){



describe('#module require', function (){
  it('should return an object', function (){
    assert.equal(typeof raminfo, 'object');
  });
});


describe('#set', function (){
  it('should not raise an error when called', function (){
    raminfo.set({noError: true});
  });

  it('should not raise an error when we give no object', function (){
    raminfo.set();
  });

  it('should be able to set raminfo.testProperty to 123', function (){
    raminfo.set({testProperty: 123});
    assert.equal(raminfo.testProperty, 123);
  });

  it('should be able to set raminfo.dumpDir', function (){
    raminfo.set({ dumpDir: correctDumpDir });
  });

});


describe('#log', function (){
  it('should not raise an error and log information here ^', function (){
    raminfo.log();
  });
});


describe('#raminfo.makeBytesReadable', function (){
  it('should not raise an error when we give no memInfo object', function (){
    raminfo.makeBytesReadable(); 
  });

  it('should return an object with properties set to 0', function (){
    var emptyProperties = raminfo.makeBytesReadable();
    assert.equal(emptyProperties.rss.bytes, 0);
    assert.equal(emptyProperties.heapTotal.Kb, 0);
    assert.equal(emptyProperties.heapUsed.Mb, 0);
  });

  it('should succesfuly convert 1048576 bytes to 1024Kb and 1Mb', function (){
    var converted = raminfo.makeBytesReadable({ rss: 1048576 });
    assert.equal(converted.rss.bytes, 1048576);
    assert.equal(converted.rss.Kb, 1024);
    assert.equal(converted.rss.Mb, 1);
  });

});


describe('#dump', function (){
  it('should be able to call raminfo.dump without raising an error', function (){
    raminfo.dump();
  });

  it('should be able to call raminfo.dump with true argument to log about dump', function (){
    raminfo.dump(true);
  });

  it('should have written a memory info file to dumpDir', function (){
    fs.readdir(raminfo.dumpDir, function (err, files){
      if(err) throw err;
      if(files.length === 0) throw 'No files read';
    });
  });

  it('should log dump file information when logDumpFile is set', function (){
    raminfo.set({logDumpFile: true});
    raminfo.dump();
  });

  it('should not throw when we give an incorrect dumpDir but instead log about it below', function (){
    raminfo.set({dumpDir: 'somethingNotCorrect'});
    raminfo.dump();
  });
});


describe('#getInfo', function (){
  it('should give us a JSON object with memory usage properties', function (){
    var info = raminfo.getInfo();
    assert.equal(typeof info, 'object');
    assert.equal(typeof info.rss, 'object');
    assert.notEqual(info.rss.Kb, undefined);
  });
});


describe('#clearDump', function (){

  it('should be able to call raminfo.clearDump without raising an error', function (){
    raminfo.set({ dumpDir: correctDumpDir });
    raminfo.clearDump();
  });

  it('should have cleared dumpDir within 500ms', function (done){
    setTimeout(function (){
      fs.readdir(raminfo.dumpDir, function (err, files){
        if(err) throw err;
        if(files.length !== 1) throw 'clearDump() did not clear dumpDir';
        done();
      });
    }, 750);
  });

  it('should not throw when we give wrong dumpDir but instead log about it below', function (){
    raminfo.set({dumpDir: 'somethingNotCorrect'});
    raminfo.clearDump();
  });

  it('should notify us if there is nothing to clear', function (){
    raminfo.set({ dumpDir: correctDumpDir });
    raminfo.clearDump();
  });

});


describe('#run', function (){
  it('should not throw when we call it, makes use of above tested functions', function (done){
    raminfo.run();

    setTimeout(function (){
      raminfo.clearDump();
      done();
    }, 500);

  });
});


}); // /describe('raminfo')