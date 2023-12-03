// --------------- Conexión con la base de datos MongoDB------------------
const { MongoClient, ObjectId } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
let database = undefined;
let concesionarioDocument = undefined;

async function connectBD() {
  try {
    await client.connect();
    database = client.db("concesionariosDB");
    concesionarioDocument = database.collection("concesionarios");
  } catch (e) {
    console.error(e);
    console.log("ERROR de conexión a la BBDD");
    // Ensures that the client will close when you finish/error
    await client.close();
  } finally {
  }
}

connectBD().catch(console.error);

// -------------------------------------------------------------------------

// Entrypoint for response API
const express = require("express");

// Creates an Express application
const expressAPP = express();

const PORT = process.env.PORT || 8080;

/* Binds the middleware function to the path "/" (by omition). When a request is sent to
 * that path, then the middleware function gets executed.
 *
 * express.json() parses request as JSON.
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
  responseponse.json({ version: "0.0.1" });
});

expressAPP.get("/concesionarios", async (request, response) => {
  try {
    const curorConcesionarios = await concesionarioDocument.find({});
    const concesionarios = await curorConcesionarios.toArray();
    response.json(concesionarios);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error });
  }
});

expressAPP.post("/concesionarios", async (request, response) => {
  try {
    const concesionarios = await concesionarioDocument.insertOne(request.body);
    response.json({ message: "okey" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error });
  }
});

expressAPP.get("/concesionarios/:id", async (request, response) => {
  const concesionarioId = request.params.id;
  try {
    const concesionarios = await concesionarioDocument.findOne({
      _id: new ObjectId(concesionarioId),
    });
    response.json(concesionarios);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error });
  }
});

expressAPP.put("/concesionarios/:id", async (request, response) => {
  const concesionarioId = request.params.id;
  const concesionarioActualizado = request.body;
  try {
    const concesionarios = await concesionarioDocument.updateOne(
      { _id: new ObjectId(concesionarioId) },
      {
        $set: {
          nombre: concesionarioActualizado["nombre"],
          direccion: concesionarioActualizado["direccion"],
          coches: concesionarioActualizado["coches"],
        },
      }
    );
    response.json({ message: "okey" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error });
  }
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
