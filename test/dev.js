var raminfo = require('./../index.js');

raminfo.set({
  gc: global.gc,
  dumpDir: __dirname + '/../raminfoDump',
  logDumpFile: false
});


//raminfo.run();

var info = raminfo.getInfo();

console.log(info);