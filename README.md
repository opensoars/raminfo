raminfo
=======

Simple tool to dump memory info and log about it.

---

## Dependencies
* [ezlog](https://github.com/opensoars/ezlog)


## Install
`npm install raminfo`


## API
```js

var raminfo = require('raminfo');

raminfo.set({
  
  // Used so we can do some benchmarks
  gc: global.gc,

  // Where to dump the memory information
  dumpDir: __dirname + './raminfoDump',

  // Log when dumping a file
  logDumpFile: false
});


// Dump a memory info file
raminfo.dump();

// Log about memory infomation
raminfo.log();

// Get a JSON object containing readable memory information
raminfo.getInfo();

```


## Todo
* Tests
* Code coverage