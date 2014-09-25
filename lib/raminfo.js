/**
 * Pretty logging
 */
var Ezlog = require('ezlog'),
    log = new Ezlog({pref: {t: '[raminfo]', c: 'yellow'}}),
    logRed = new Ezlog({pref: {t: '[raminfo]',c: 'yellow'}, text: {c:'red'}});


/**
 * Module dependencies
 */
var fs = require('fs');


/** ramInfo namespace
 *
 * @public @export
 */
var raminfo = {};


/** Makes memory info easy to read by coverting to other units
 *
 * @public
 * @arg meminfo {object}
 * @return {object}  Human readable memInfo objec
 */
raminfo.makeBytesReadable = function(memInfo){
  memInfo = memInfo || {};

  var rss = memInfo.rss || 0,
      heapTotal = memInfo.heapTotal || 0,
      heapUsed = memInfo.heapUsed || 0;

  var rss_Kb = rss / 1024,
      heapTotal_Kb = heapTotal / 1024,
      heapUsed_Kb = heapUsed / 1024;

  var rss_Mb = (rss / 1024) / 1024,
      heapTotal_Mb = (heapTotal / 1024) / 1024,
      heapUsed_Mb = (heapUsed / 1024) / 1024;

  return {
    rss: { bytes: rss, Kb: rss_Kb, Mb: rss_Mb },
    heapTotal: { bytes: heapTotal, Kb: heapTotal_Kb, Mb: heapTotal_Mb },
    heapUsed: { bytes: heapUsed, Kb: heapUsed_Kb, Mb: heapUsed_Mb }
  };
};


/** Sets properties to raminfo
 *
 * @public
 * @arg o {object}  Properties to set
 */
raminfo.set = function (o){
  o = o || {};
  for(var key in o) this[key] = o[key];
};


/** Logs memory usage in a readable form
 *
 * @public
 * Calls makeBytesReadable
 */
raminfo.log = function (){
  var info = process.memoryUsage(),
      infoString = JSON.stringify(info, undefined, 2);

  log(this.makeBytesReadable(infoString));
};


/** Dumps memory usage to dumpDir
 *
 * @public
 * @arg useLog {bool}  Log about dump or not
 */
raminfo.dump = function (useLog){

  var self = this,
      info = process.memoryUsage(),
      infoString = JSON.stringify(info, undefined, 2);
      now = new Date().getTime();

  if(useLog) log(infoString);

  fs.writeFile(this.dumpDir + '/' + now, infoString, function (err){
    if(err) return logRed('Failed to write dump file, err below', err);

    if(self.logDumpFile) log('Dumped in file: ' + now);
  });

};


/** Runs dump with logging
 *
 * @public
 */
raminfo.run = function (){
  // true as first argument will use logger with dump
  this.dump(true);
};


/** Get human readable info
 *
 * @public
 * @return {object}  Human readable memory usage
 */
raminfo.getInfo = function (){

  var info = process.memoryUsage(),
      infoString = JSON.stringify(info, undefined, 2);

  return this.makeBytesReadable(info);
};


/** Clears the dump folder
 *
 * @public
 */
raminfo.clearDump = function (){
  var self = this;

  fs.readdir(self.dumpDir, function (err, files){
    if(err) return logRed('Could not read dumpDir, err blow', err);

    if(files.length === 1) return log('No files to delete dumpDir is empty');

    files.forEach(function (file){

      if(file === '.gitignore') return;

      fs.unlink(self.dumpDir + '/' + file, function (err){
        //if(err) return logRed('Could not remove file: ' + file, err);
        log('Removed file: ' + file);
      });
    });
  });

};


module.exports = raminfo;
