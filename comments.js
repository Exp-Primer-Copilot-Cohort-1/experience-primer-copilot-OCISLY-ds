// Create web server
// Run: node comments.js
// Test: curl -X POST -d "comment=Hello World" http://localhost:3000/comments

var http = require('http');
var qs = require('querystring');

var comments = [];

// Create web server
http.createServer(function(req, res) {
  console.log(req.method);
  if (req.method === 'POST') {
    var body = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) {
      body += chunk;
    });
    req.on('end', function() {
      var obj = qs.parse(body);
      comments.push(obj.comment);
      show(res);
    });
  } else {
    show(res);
  }
}).listen(3000);

// Display comments
function show(res) {
  var html = '<html><head><title>Comment</title></head><body>'
           + '<h1>Comment</h1>'
           + '<form method="post" action="/">'
           + '<textarea name="comment"></textarea>'
           + '<input type="submit" value="Submit">'
           + '</form>'
           + '<h2>Comments</h2>'
           + '<ul>'
           + comments.map(function(comment) {
               return '<li>' + comment + '</li>';
             }).join('')
           + '</ul>'
           + '</body></html>';
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(html));
  res.end(html);
}