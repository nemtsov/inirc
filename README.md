inirc [![Build Status](https://travis-ci.org/nemtsov/inirc.png)](https://travis-ci.org/nemtsov/inirc)
=====

An `ini` format `~/.<your>rc` file management library.

Usage
-----

```javascript
var inirc = require('inirc'),
  rc = inirc('.awesomerc');

rc.put({user: {name: 'heather'}}, function (err) {
  if (err) throw err;
});
```

Creates a `~/.awesomerc` with the following contents:
```
[user]
name = heather
```

You can also `get` and `del`:

```javascript
rc.get(function (err, data) {
  if (err) throw err;
  assert(data.user.name === 'heather');
});

rc.del(function (err) {
  if (err) throw err;
});
```


API
---

**initrc(name, [options])**

Creates an `rc` instance.

The option `home` is available. It defaults to the current user's home directory, which is set by the environment varialbe `HOME` in \*nix and `USERPROFILE` on win. The option `mode` will allow you to set a custom file access permission on the rc file. It defaults to `0600` (rw for the owner only).


**rc.put(configObject, cb)**

**rc.get(cb)**

**rc.del(cb)**


License
-------

MIT
