var inirc = require('../index'),
  os = require('os'),
  path = require('path');

describe('inirc', function () {
  describe('get', function () {
    it('should return an empty obj if not found', function (done) {
      var rc = init('nonexistent');
      function check(err, cfg) {
        if (err) return done(err);
        cfg.should.eql({});
        done();
      }
      rc.get(check);
    });

    it('should return obj if found', function (done) {
      var rc = init('good.ini');
      function check(err, cfg) {
        if (err) return done(err);
        cfg.should.eql({user: {accessToken: 'abc'}});
        done();
      }
      rc.get(check);
    });
  });

  it('should create a new file, read and delete it', function (done) {
    var rc = initTemp();
    function get(err) {
      if (err) return done(err);
      rc.get(del);
    }
    function del(err, data) {
      if (err) return done(err);
      data.a.answer.should.equal('42'); // gah
      data.b.should.equal('ok');
      rc.del(getEmpty);
    }
    function getEmpty(err) {
      if (err) return done(err);
      rc.get(check);
    }
    function check(err, data) {
      if (err) return done(err);
      data.should.eql({});
      done();
    }
    rc.put({a: {answer: 42}, b: 'ok'}, get);
  });
});

function init(name) {
  return inirc(name, {
    home: path.join(__dirname, 'fixtures')
  });
}

function initTemp() {
  var name = 'inirc_test_' + Math.random();
  return inirc(name, {home: os.tmpdir()});
}
