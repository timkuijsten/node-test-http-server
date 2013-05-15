# test-http-server

Small utility to easily test webservers.

## Usage

    // let the library create a new web server. 
    var TestHttpServer = require('test-http-server');
    var server = new TestHttpServer();
    server.listen(1234, '127.0.0.1', function() {
      server.get('/some/url', function(response, body) {
        // do some stuff with the response or the body
      });
    });

    // or use an existing web server. 
    var server = http.createServer();
    new TestHttpServer(server);

    // setup a simple echo server
    server.on('request', function(req, res) {
      req.pipe(res);
    });

    // post some data and expect it to be echo'd back
    server.listen(1234, '127.0.0.1', function() {
      var data = 'foo';
      server.post('/some/url', data, function(response, body) {
        // body is 'foo' because of the echo server
      });
    });

## Installation

    $ npm install test-http-server

## API

### TestHttpServer([server])
* server http.Server, default new http.Server()

Decorates the provided or a new http server with with easy to use client request methods.

### server.setBasicAuth(username, password)
* username String
* password String

Set credentials to be used with each request.

### server.get(url, cb, [headers])
* url String
* cb Function
* headers Object

Do a get request. Callback is called with the response and the body.

### server.head(url, cb, [headers])
* url String
* cb Function
* headers Object

Do a head request. Callback is called with the response and the body.

### server.post(url, data, cb, [headers])
* url String
* data {String|Object}
* cb Function
* headers Object

Do a post request. If data is an object, the default content-type will be application/json. Callback is called with the response and the body.

### server.put(url, data, cb, [headers])
* url String
* data {String|Object}
* cb Function
* headers Object

Do a put request. If data is an object, the default content-type will be application/json. Callback is called with the response and the body.

### server.patch(url, data, cb, [headers])
* url String
* data {String|Object}
* cb Function
* headers Object

Do a patch request. If data is an object, the default content-type will be application/json. Callback is called with the response and the body.

### server.del(url, cb, [headers])
* url String
* cb Function
* headers Object

Do a delete request. Callback is called with the response and the body.

## License

MIT, see LICENSE

## Bugs

See <https://github.com/timkuijsten/node-test-http-server/issues>.
