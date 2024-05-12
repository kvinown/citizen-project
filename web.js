const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
	let q = url.parse(req.url, true);
	let path = q.query;
	let fileLocation;

	switch (path.menu) {
		case "/":
			fileLocation = "pages/home.html";
			break;
		case "home":
			fileLocation = "pages/home.html";
			break;
		case "penduduk":
			fileLocation = "pages/penduduk/index.html";
			break;
		case "tambah_penduduk":
			fileLocation = "pages/penduduk/create.html";
			break;
		case "kartu_keluarga":
			fileLocation = "pages/kartu_keluarga/index.html";
			break;
		case "tambah_kartu_keluarga":
			fileLocation = "pages/kartu_keluarga/create.html";
			break;
		default:
			fileLocation = "pages/home.html";
			break;
	}

	fs.readFile(fileLocation, (err, data) => {
		if (err) {
			res.writeHead(404, { "Content-type": "text/html" });
			return res.end("404 not found");
		}
		res.writeHead(200, { "Content-type": "text/html" });
		res.write(data);
		return res.end();
	});
});

server.listen(8888, () => {
	console.log("Server is running on http://localhost:8888/");
});
