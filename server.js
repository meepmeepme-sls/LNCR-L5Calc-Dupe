const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.rsc': 'text/x-component'
};

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Check RSC header
  if (req.headers['rsc'] === '1') {
    let rscName = pathname.replace(/^\/+|\/+$/g, '') || 'index';
    let rscFile = path.join(ROOT_DIR, '_rsc', `${rscName}.rsc`);
    if (fs.existsSync(rscFile)) {
      res.writeHead(200, {
        'Content-Type': 'text/x-component',
        'Cache-Control': 'no-cache'
      });
      return fs.createReadStream(rscFile).pipe(res);
    }
  }

  // Handle mock/proxy for scrape-points API
  if (pathname.startsWith('/api/scrape-points')) {
    const targetUrl = parsedUrl.searchParams.get('url');
    if (!targetUrl) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Missing url parameter' }));
    }
    const https = require('https');
    https.get(`https://nhrl.io/api/scrape-points?url=${encodeURIComponent(targetUrl)}`, (upstream) => {
      res.writeHead(upstream.statusCode, {
        'Content-Type': upstream.headers['content-type'] || 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      upstream.pipe(res);
    }).on('error', (err) => {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    });
    return;
  }

  // Resolve target file
  let filePath = path.join(ROOT_DIR, pathname);

  // Try direct path, then dir/index.html, then path.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    const indexFile = path.join(filePath, 'index.html');
    if (fs.existsSync(indexFile)) {
      filePath = indexFile;
    }
  } else if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    const notFound = path.join(ROOT_DIR, '404.html');
    if (fs.existsSync(notFound)) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      return fs.createReadStream(notFound).pipe(res);
    }
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('404 Not Found');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  res.writeHead(200, {
    'Content-Type': contentType,
    'Cache-Control': ext.match(/\.(woff2|css|js|jpg|png|svg)$/) ? 'public, max-age=31536000' : 'no-cache'
  });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  console.log(`LNCR-L5Calc-Dupe local dev server running at: http://localhost:${PORT}`);
});
