/*jshint -W068, -W030 */

var should = require('should');
var testHttpServer = require('../index');
var http = require('http');

// 1. make the server start listening 
// 2. fire a request by executing fire
// 3. when the request comes in, echo back the body and close the server
// 4. call done
function listenFireEchoAndClose(server, fire, done) {
  done = done || function() {};

  server.on('request', function(req, res) {
    if (req.headers['content-type']) {
      res.setHeader('Content-Type', req.headers['content-type']);
    }
    req.pipe(res);
    server.close(done);
  });

  server.listen(1234, '0.0.0.0', fire);
}

describe('TestHttpServer', function () {
  describe('constructor', function () {
    it('should require server', function() {
      (function () { testHttpServer(); }).should.throw('provide server');
    });

    it('should require server to be a http.Server', function() {
      (function () { testHttpServer({}); }).should.throw('server must be a http.Server');
    });

    it('should not throw', function() {
      (function () { testHttpServer(new http.Server()); }).should.not.throw();
    });

    it('should return the provided server', function() {
      var server = new http.Server();
      var r = testHttpServer(server);
      should.equal(server, r);
    });

    it('should decorate provided server with a get method', function() {
      var server = new http.Server();
      testHttpServer(server);
      server.get.should.be.a('function');
    });
  });

  describe('get', function () {
    it('should require url', function() {
      var server = new http.Server();
      testHttpServer(server);
      (function () { server.get(); }).should.throw('provide url');
    });

    it('should require url to be a string', function() {
      var server = new http.Server();
      testHttpServer(server);
      (function () { server.get({}); }).should.throw('url must be a string');
    });

    it('should require the server to be listening', function() {
      var server = new http.Server();
      testHttpServer(server);
      (function () { server.get('/'); }).should.throw('can not obtain address, maybe the server is not listening yet');
    });

    it('should get without a timeout', function(done) {
      var server = new http.Server();
      testHttpServer(server);
      listenFireEchoAndClose(server, function() {
        server.get('/');
      }, done);
    });

    it('should get without a timeout with a provided server', function(done) {
      var server = new http.Server();
      testHttpServer(server);
      listenFireEchoAndClose(server, function() {
        server.get('/');
      }, done);
    });
  });

  describe('head', function () {
    it('should get without a timeout', function(done) {
      var server = new http.Server();
      testHttpServer(server);
      listenFireEchoAndClose(server, function() {
        server.head('/');
      }, done);
    });

    it('should get without a timeout with a provided server', function(done) {
      var server = new http.Server();
      testHttpServer(server);
      listenFireEchoAndClose(server, function() {
        server.head('/');
      }, done);
    });
  });

  describe('post', function () {
    it('should require data', function() {
      var server = new http.Server();
      testHttpServer(server);
      (function () { server.post('/'); }).should.throw('provide data');
    });

    it('should require data to not be a function', function() {
      var server = new http.Server();
      testHttpServer(server);
      (function () { server.post('/', function() {}); }).should.throw('data can not be a function');
    });

    it('should receive data without a timeout', function(done) {
      var server = new http.Server();
      testHttpServer(server);
      listenFireEchoAndClose(server, function() {
        server.post('/', { foo: 'bar' }, function(res, body) {
          body.should.have.property('foo', 'bar');
          done();
        });
      });
    });

    it('should receive data without a timeout with a provided server', function(done) {
      var server = new http.Server();
      testHttpServer(server);
      listenFireEchoAndClose(server, function() {
        server.post('/', { foo: 'bar' }, function(res, body) {
          body.should.have.property('foo', 'bar');
          done();
        });
      });
    });
  });

  describe('put', function () {
    it('should receive the string back from the echo server', function(done) {
      var server = new http.Server();
      testHttpServer(server);
      listenFireEchoAndClose(server, function() {
        server.put('/', 'foo', function(res, body) {
          should.equal(body, 'foo');
          done();
        });
      });
    });
  });
});
