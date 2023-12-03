# API de Concesionarios

Una API REST programada con Express para gestionar los distintos concesionarios.

## Requisitos Previos

Asegúrate de tener Node.js y npm instalados en tu máquina antes de ejecutar la aplicación.

## Iniciar la Aplicación

```
npm start
```

La API se ejecutará por defecto en el puerto 8080. Si la variable de entorno
PORT Está definida, esta tendrá preferencia.

## ENDPOINTS

- ObjId = el id del objeto concesionario de la colección.
- cocheId = la posición del coche en el array.

### Concesionarios:

- GET /concesionarios: Obtiene todos los concesionarios.
- POST /concesionarios: Crea un nuevo concesionario.
- GET /concesionarios/:objId Obtiene un concesionario.
- PUT /concesionarios/:objId Actualiza un concesionario.
- DELETE /concesionarios/:objId Borra un concesionario.

### Coches

- GET /concesionarios/:objId/coches: Obtiene todos los coches de un concesionario.
- POST /concesionarios/:objId/coches: Añade un nuevo coche a un concesionario.
- GET /concesionarios/:objId/coches/:cocheId : Obtiene un coche de un concesionario.
- PUT /concesionarios/:objId/coches/:cocheId : Actualiza un coche por de un concesionario por ID.
- DELETE /concesionarios/:objId/coches/:cocheId : Borra un coche de un concesionario.
