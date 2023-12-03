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

expressAPP.get("/concesionarios/:ObjId", async (request, response) => {
  const concesionarioId = request.params.ObjId;
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

expressAPP.put("/concesionarios/:ObjId", async (request, response) => {
  const concesionarioId = request.params.ObjId;
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

    if (resultado.modifiedCount < 1) {
      throw "Nothing modified";
    }

    response.json({ message: "okey" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error });
  }
});

expressAPP.delete("/concesionarios/:ObjId", async (request, response) => {
  const concesionarioId = request.params.ObjId;
  try {
    const concesionario = await concesionarioDocument.deleteOne({
      _id: new ObjectId(concesionarioId),
    });
    response.json({ message: "okey" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error });
  }
});

expressAPP.get("/concesionarios/:ObjId/coches", async (request, response) => {
  const concesionarioId = request.params.ObjId;
  try {
    const concesionarios = await concesionarioDocument.findOne({
      _id: new ObjectId(concesionarioId),
    });
    response.json(concesionarios["coches"]);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error });
  }
});

expressAPP.post("/concesionarios/:ObjId/coches", async (request, response) => {
  const concesionarioId = request.params.ObjId;
  const nuevoCoche = request.body;
  try {
    const resultado = await concesionarioDocument.updateOne(
      { _id: new ObjectId(concesionarioId) },
      {
        $push: {
          coches: nuevoCoche,
        },
      }
    );
    if (resultado.modifiedCount < 1) {
      throw "Nothing modified";
    }

    response.json({ message: "okey" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error });
  }
});

expressAPP.get("/concesionarios/:ObjId/coches/:cocheId", async (request, response) => {
  const concesionarioId = request.params.ObjId;
  const cocheId = request.params.cocheId;

  try {
    const concesionarios = await concesionarioDocument.findOne({
      _id: new ObjectId(concesionarioId),
    });

    let cocheEncontrado = null;
    for (let i = 0; i < concesionarios.coches.length; i++) {
      if (i == parseInt(cocheId)) {
        cocheEncontrado = concesionarios.coches[i];
      }
    }
    if (!cocheEncontrado) {
      throw "ID not found";
    }
    response.json(cocheEncontrado);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error });
  }
});

expressAPP.put("/concesionarios/:ObjId/coches/:cocheId", async (request, response) => {
  const concesionarioId = request.params.ObjId;
  const cocheId = request.params.cocheId;
  const cocheNuevo = request.body;

  try {
    const resultado = await concesionarioDocument.updateOne(
      { _id: new ObjectId(concesionarioId) },
      {
        $set: {
          [`coches.${cocheId}`]: cocheNuevo,
        },
      }
    );

    if (resultado.modifiedCount < 1) {
      throw "Nothing modified";
    }

    response.json({ message: "okey" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error });
  }
});

expressAPP.delete("/concesionarios/:id/coches/:cocheId", async (request, response) => {
  const concesionarioId = request.params.id;
  const cocheId = parseInt(request.params.cocheId);

  try {
    const concesionarios = await concesionarioDocument.findOne({
      _id: new ObjectId(concesionarioId),
    });

    let cocheEncontrado = null;
    for (let i = 0; i < concesionarios.coches.length; i++) {
      if (i == parseInt(cocheId)) {
        cocheEncontrado = concesionarios.coches[i];
      }
    }
    if (!cocheEncontrado) {
      throw "ID not found";
    }
    const resultado = await concesionarioDocument.updateOne(
      { _id: new ObjectId(concesionarioId) },
      {
        $pull: {
          coches: { $eq: cocheEncontrado },
        },
      }
    );

    if (resultado.modifiedCount < 1) {
      throw "Nothing modified";
    }
    response.json({ message: "okey" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error });
  }
});
