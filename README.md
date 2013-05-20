# test-http-server

Decorate webservers with easy to use client request methods.

## Usage

    // setup and start a simple echo server
    var server = http.createServer();
    server.on('request', function(req, res) { req.pipe(res); });

    server.listen(1234, '127.0.0.1', function() {
      var data = 'foo';

      // decorate server with .get(), .post(), .path() etc.
      require('test-http-server')(server);

      // now get, head, post, put, patch, del are available
      // on server

      // post some data and expect it to be echo'd back
      server.post('/some/url', data, function(response, body) {
        // post request is done and body is 'foo'
      });
    });

## Installation

    $ npm install test-http-server

## API

### testHttpServer(server)
* server http.Server

Decorates the provided http server with with easy to use client request methods.

### server.setBasicAuth(username, password)
* username String
* password String

Set credentials to be used with each request.

### server.get(url, [headers], [cb])
* url String
* headers Object
* cb Function

Do a get request. Callback is called with the response and the body.

### server.head(url, [headers], [cb])
* url String
* headers Object
* cb Function

Do a head request. Callback is called with the response and the body.

### server.post(url, data, [headers], [cb])
* url String
* data {String|Object}
* headers Object
* cb Function

Do a post request. If data is an object, the default content-type will be application/json. Callback is called with the response and the body.

### server.put(url, data, [headers], [cb])
* url String
* data {String|Object}
* headers Object
* cb Function

Do a put request. If data is an object, the default content-type will be application/json. Callback is called with the response and the body.

### server.patch(url, data, [headers], [cb])
* url String
* data {String|Object}
* headers Object
* cb Function

Do a patch request. If data is an object, the default content-type will be application/json. Callback is called with the response and the body.

### server.del(url, [headers], [cb])
* url String
* headers Object
* cb Function

Do a delete request. Callback is called with the response and the body.

## License

MIT, see LICENSE

## Bugs

See <https://github.com/timkuijsten/node-test-http-server/issues>.
