inirc [![Build Status](https://secure.travis-ci.org/nemtsov/inirc.png)](http://travis-ci.org/nemtsov/inirc)
=====

An `ini` format .*rc file management library.

Usage
-----

```
var inirc = require('inirc'),
  rc = inirc('.awesomerc');

rc.put({awesome: true}, function (err) {
  if (err) throw err;
});

rc.get(function (err, data) {
  if (err) throw err;
  assert(data.awesome);
});

rc.del(function (err) {
  if (err) throw err;
});

```


API
---

*initrc(name, [options])*

Creates an `rc` instance.

The option `home` is available. It defaults to the current user's home directory, which is set by the environment varialbe `HOME` in *nix and `USERPROFILE` on win.


*rc.put(configObject, cb)*

*rc.get(cb)*

*rc.del(cb)*


License
-------

MIT
