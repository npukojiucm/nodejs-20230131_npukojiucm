const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'DELETE':
      const inValidPath = new RegExp('\/');
      if (inValidPath.test(pathname)) {
        res.statusCode = 400;
        res.end('Nested paths are not supported');
        break;
      }

      if (!fs.existsSync(filepath)) {
        console.log('мы тут');
        res.statusCode = 404;
        res.end('File not found');
        break;
      }



      fs.unlinkSync(filepath);
      res.statusCode = 200;
      res.end('Файл успешно удален');

      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
