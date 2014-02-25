var ini = require('ini'),
  path = require('path'),
  fs = require('fs');

module.exports = IniRc;

function IniRc(name, options) {
  if (!(this instanceof IniRc)) {
    return new IniRc(name, options);
  }
  options = options || {};
  options.home = options.home || getUserHome();
  options.mode = options.mode || 0600;
  this._options = options;
  this._path = path.join(options.home, name);
}

IniRc.prototype.put = function (data, cb) {
  fs.writeFile(this._path, ini.stringify(data), {
    mode: this._options.mode
  }, cb);
};

IniRc.prototype.get = function (cb) {
  var self = this;
  function read(exists) {
    if (!exists) {
      return process.nextTick(function () {
        cb(null, {});
      });
    }
    fs.readFile(self._path, {encoding: 'utf-8'}, parse);
  }
  function parse(err, data) {
    if (err) return cb(err);
    cb(null, ini.parse(data));
  }
  fs.exists(this._path, read);
};

IniRc.prototype.del = function (cb) {
  fs.unlink(this._path, cb);
};

function getUserHome() {
  return process.env[(process.platform == 'win32') ?
    'USERPROFILE' : 'HOME'];
}
