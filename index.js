// Entrypoint for REST API

const express = require("express");

// Creates an Express application
const expressAPP = express();

const PORT = process.env.PORT || 8080;

/* Binds the middleware function to the path "/" (by omition). When a request is sent to
 * that path, then the middleware function gets executed.
 *
 * express.json() parses requests as JSON.
 *
 * Middleware functions are functions that have access to the request object (req), the response object (res),
 * and the next middleware function in the application’s request-response cycle
 */
expressAPP.use("/", express.json());

//Starts a UNIX socket and listens for connections on the given path
expressAPP.listen(PORT, () => {
  console.log(`Listening on -> localhost:${PORT}`);
});

// Binds callback to an specific path
expressAPP.get("/info", (request, response) => {
  response.json({ version: "0.0.1" });
});
