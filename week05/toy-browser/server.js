const http = require("http");

// 返回 content-type = text/plain
const server = http.createServer((req, res) => {
    console.log("request received")
    console.log(req.headers)
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Foo', 'bar');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('ok');
  });

  server.listen("8088");