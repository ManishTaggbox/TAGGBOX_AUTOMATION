const http = require('http');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const PORT = 3333;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Serve the HTML UI at /
  if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
    const htmlPath = path.join(__dirname, 'test-ui.html');
    fs.readFile(htmlPath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('test-ui.html not found. Make sure it is in the same folder as run-tests.js');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
    return;
  }

  // Health check
  if (req.method === 'GET' && req.url === '/ping') {
    res.writeHead(200);
    res.end('pong');
    return;
  }

  // Run a test
  if (req.method === 'POST' && req.url === '/run') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      let tag;
      try {
        tag = JSON.parse(body).tag;
      } catch {
        res.writeHead(400);
        res.end('bad json');
        return;
      }

      if (!tag) {
        res.writeHead(400);
        res.end('missing tag');
        return;
      }

      const cmd = `npx playwright test --grep "${tag}" --headed --reporter=list`;
      console.log(`\n Running: ${cmd}\n`);

      res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'Access-Control-Allow-Origin': '*',
      });

      const proc = exec(cmd, { cwd: __dirname });
      proc.stdout.on('data', d => { process.stdout.write(d); res.write(d); });
      proc.stderr.on('data', d => { process.stderr.write(d); res.write(d); });
      proc.on('close', code => {
        res.write(`\n\nExited with code ${code}`);
        res.end();
      });
    });
    return;
  }

  res.writeHead(404);
  res.end('not found');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n Playwright Test Runner ready!`);
  console.log(` Local:  http://localhost:${PORT}`);
  console.log(` Share your ngrok URL with teammates to give them access.\n`);
});