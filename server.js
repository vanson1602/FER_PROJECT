const jsonServer = require('json-server');
const auth = require('json-server-auth');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.use(jsonServer.rewriter({
    "/auth/login": "/users/login",
    "/users": "/users",
    "/movies": "/movies"
}));

// To handle POST, PUT and PATCH you need to use a body-parser
server.use(jsonServer.bodyParser);

// You must apply the auth middleware before the router
server.use(auth);
server.use(router);

server.listen(3001, () => {
    console.log('JSON Server is running on port 3001');
}); 