// Entrypoint for response API

const express = require("express");

// Creates an Express application
const expressAPP = express();

const PORT = process.env.PORT || 8080;

/* Binds the middleware function to the path "/" (by omition). When a requestuest is sent to
 * that path, then the middleware function gets executed.
 *
 * expresponses.json() parses requestuests as JSON.
 *
 * Middleware functions are functions that have access to the requestuest object (request), the responseponse object (response),
 * and the next middleware function in the application’s requestuest-responseponse cycle
 */
expressAPP.use("/", express.json());

//Starts a UNIX socket and listens for connections on the given path
expressAPP.listen(PORT, () => {
  console.log(`Listening on -> localhost:${PORT}`);
});

// Binds callback to an specific path
expressAPP.get("/info", (request, response) => {
  responseponse.json({ version: "0.0.1" });
});

// Definimos una estructura de datos
// (temporal hasta incorporar una base de datos)
let listaCoches = [
  { modelo: "Clio", cv: 1000, precio: 20000 },
  { modelo: "Skyline R34", cv: 200, precio: 10000 },
];
let concesionarioDePrueba = {
  nombre: "concesionario1",
  direccion: "avda inventada",
  coches: listaCoches,
};
let concesionarios = [concesionarioDePrueba];

expressAPP.get("/concesionarios", (request, response) => {
  response.json(concesionarios);
});

expressAPP.post("/concesionarios", (request, response) => {
  const nuevoConcesionario = request.body;
  concesionarios.push(nuevoConcesionario);
  response.json({ message: "okey" });
});

expressAPP.get("/concesionarios/:id", (request, response) => {
  const concesionarioId = request.params.id;
  const concesionario = concesionarios[concesionarioId];
  response.json(concesionario);
});

expressAPP.put("/concesionarios/:id", (request, response) => {
  const concesionarioId = request.params.id;
  concesionarios[concesionarioId] = request.body;
  response.json({ message: "okey" });
});

expressAPP.delete("/concesionarios/:id", (request, response) => {
  const concesionarioId = request.params.id;
  const deletedConcesionario = concesionarios.splice(concesionarioId, 1);
  response.json({ message: "okey" });
});

expressAPP.get("/concesionarios/:id/coches", (request, response) => {
  const concesionarioId = request.params.id;
  const coches = concesionarios[concesionarioId].coches;
  response.json(coches);
});

expressAPP.post("/concesionarios/:id/coches", (request, response) => {
  const concesionarioId = request.params.id;
  const nuevoCoche = request.body;
  concesionarios[concesionarioId].coches.push(nuevoCoche);
  response.json({ message: "okey" });
});

expressAPP.get("/concesionarios/:id/coches/:cocheId", (request, response) => {
  const concesionarioId = request.params.id;
  const cocheId = request.params.cocheId;
  const coche = concesionarios[concesionarioId].coches[cocheId];
  response.json(coche);
});

expressAPP.put("/concesionarios/:id/coches/:cocheId", (request, response) => {
  const concesionarioId = request.params.id;
  const cocheId = request.params.cocheId;
  concesionarios[concesionarioId].coches[cocheId] = request.body;
  response.json({ message: "okey" });
});

expressAPP.delete("/concesionarios/:id/coches/:cocheId", (request, response) => {
  const concesionarioId = request.params.id;
  const cocheId = request.params.cocheId;
  const deletedCoche = concesionarios[concesionarioId].coches.splice(cocheId, 1);
  response.json({ message: "okey" });
});
