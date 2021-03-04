const http = require('http');

const routes = require('./routes');

const PORT = 4000;

const server = http.createServer(routes.handler);

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));