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

// Definimos una estructura de datos
// (temporal hasta incorporar una base de datos)
let coches = [
  { marca: "Renault", modelo: "Clio" },
  { marca: "Nissan", modelo: "Skyline R34" },
];

// Lista todos los coches
app.get("/coches", (request, response) => {
  response.json(coches);
});

// Añadir un nuevo coche
app.post("/coches", (request, response) => {
  coches.push(request.body);
  response.json({ message: "ok" });
});

// Obtener un solo coche
app.get("/coches/:id", (request, response) => {
  const id = request.params.id;
  const result = coches[id];
  response.json({ result });
});

// Actualizar un solo coche
app.put("/coches/:id", (request, response) => {
  const id = request.params.id;
  coches[id] = request.body;
  response.json({ message: "ok" });
});

// Borrar un elemento del array
app.delete("/coches/:id", (request, response) => {
  const id = request.params.id;
  coches = coches.filter((item) => coches.indexOf(item) !== id);

  response.json({ message: "ok" });
});
