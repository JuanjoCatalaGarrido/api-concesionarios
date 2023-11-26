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

### Concesionarios:

- GET /concesionarios: Obtiene todos los concesionarios.
- POST /concesionarios: Crea un nuevo concesionario.
- GET /concesionarios/:id: Obtiene un concesionario.
- PUT /concesionarios/:id: Actualiza un concesionario.
- DELETE /concesionarios/:id: Borra un concesionario.

### Coches

- GET /concesionarios/:id/coches: Obtiene todos los coches de un concesionario.
- POST /concesionarios/:id/coches: Añade un nuevo coche a un concesionario.
- GET /concesionarios/:id/coches/:cocheId: Obtiene un coche de un concesionario.
- PUT /concesionarios/:id/coches/:cocheId: Actualiza un coche por de un concesionario por ID.
- DELETE /concesionarios/:id/coches/:cocheId: Borra un coche de un concesionario.
