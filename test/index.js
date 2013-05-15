/*jshint -W068, -W030 */

var should = require('should');
var TestHttpServer = require('../index');
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
    it('should not throw', function() {
      (function () { new TestHttpServer(); }).should.not.throw();
    });

    it('should implement http.Server', function() {
      var server = new TestHttpServer();
      server.should.be.an.instanceof(http.Server);
    });

    it('should start listening', function(done) {
      var server = new TestHttpServer();
      server.listen(12345, '0.0.0.0', function() {
        var address = server.address();
        should.equal(address.address, '0.0.0.0');
        should.equal(address.port, 12345);
        server.close(done);
      });
    });

    it('should return a server decorated with a get method', function() {
      var server = new TestHttpServer(server);
      server.get.should.be.a('function');
    });

    it('should throw if server is not a http.Server', function() {
      (function () { new TestHttpServer({}); }).should.throw('server must be a http.Server');
    });

    it('should not throw with custom http.Server', function() {
      (function () { new TestHttpServer(new http.Server()); }).should.not.throw();
    });

    it('should not return a new server when one is provided', function() {
      var server = new http.Server();
      var r = new TestHttpServer(server);
      should.equal(server, r);
    });

    it('should decorate provided server with a get method', function() {
      var server = new http.Server();
      new TestHttpServer(server);
      server.get.should.be.a('function');
    });
  });

  describe('get', function () {
    it('should require url', function() {
      var server = new TestHttpServer();
      (function () { server.get(); }).should.throw('provide url');
    });

    it('should require url to be a string', function() {
      var server = new TestHttpServer();
      (function () { server.get({}); }).should.throw('url must be a string');
    });

    it('should require the server to be listening', function() {
      var server = new TestHttpServer();
      (function () { server.get('/'); }).should.throw('can not obtain address, maybe the server is not listening yet');
    });

    it('should get without a timeout', function(done) {
      var server = new TestHttpServer();
      listenFireEchoAndClose(server, function() {
        server.get('/');
      }, done);
    });

    it('should get without a timeout with a provided server', function(done) {
      var server = new http.Server();
      new TestHttpServer(server);
      listenFireEchoAndClose(server, function() {
        server.get('/');
      }, done);
    });
  });

  describe('head', function () {
    it('should get without a timeout', function(done) {
      var server = new TestHttpServer();
      listenFireEchoAndClose(server, function() {
        server.head('/');
      }, done);
    });

    it('should get without a timeout with a provided server', function(done) {
      var server = new http.Server();
      new TestHttpServer(server);
      listenFireEchoAndClose(server, function() {
        server.head('/');
      }, done);
    });
  });

  describe('post', function () {
    it('should require data', function() {
      var server = new TestHttpServer();
      (function () { server.post('/'); }).should.throw('provide data');
    });

    it('should require data to not be a function', function() {
      var server = new TestHttpServer();
      (function () { server.post('/', function() {}); }).should.throw('data can not be a function');
    });

    it('should receive data without a timeout', function(done) {
      var server = new TestHttpServer();
      listenFireEchoAndClose(server, function() {
        server.post('/', { foo: 'bar' }, function(res, body) {
          body.should.have.property('foo', 'bar');
          done();
        });
      });
    });

    it('should receive data without a timeout with a provided server', function(done) {
      var server = new http.Server();
      new TestHttpServer(server);
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
      new TestHttpServer(server);
      listenFireEchoAndClose(server, function() {
        server.put('/', 'foo', function(res, body) {
          should.equal(body, 'foo');
          done();
        });
      });
    });
  });
});
