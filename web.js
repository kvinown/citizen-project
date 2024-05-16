const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const q = url.parse(req.url, true);
    const pathname = q.pathname;
    let fileLocation = 'public/pages/views/index.html'; // Default file location

    // Route handling
    if (pathname === '/' || pathname === '/master') {
        fileLocation = 'public/views/master.html';
    } else if (pathname.startsWith('/css') || pathname.startsWith('/js')) {
        fileLocation = path.join('public', pathname);
    } else if (pathname === '/navbar.html') {
        fileLocation = 'public/views/navbar.html';
    } else if (pathname === '/sidebar.html') {
        fileLocation = 'public/views/sidebar.html';
    } else if (pathname === '/content.html') {
        fileLocation = 'public/views/content.html';
    } else if (pathname === '/penduduk/content.html') {
        fileLocation = 'public/views/penduduk/content.html';
    } else if (pathname === '/kartu_keluarga/content.html') {
        fileLocation = 'public/views/kartu_keluarga/content.html';
    }

    // Determine the content type based on the file extension
    const extname = path.extname(fileLocation);
    let contentType = 'text/html'; // Default content type
    switch (extname) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'application/javascript';
            break;
    }

    // Read and serve the file
    fs.readFile(fileLocation, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end('404 Not Found');
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.write(data);
        return res.end();
    });
});

server.listen(8888, () => {
    console.log('Server is running on port 8888');
});
