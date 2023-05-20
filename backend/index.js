const express = require("express");
const cors = require("cors");
const {
  obtenerListadoJoyas,
  obtenerListadoJoyasFiltrado,
} = require("./modules/controlador");

const app = express();
app.listen(3000, console.log("Servidor corriendo en el puerto 3000 :)"));

app.use(cors());
app.use(express.json());

/* Crear una ruta GET /joyas que:
a. Devuelva la estructura HATEOAS de todas las joyas almacenadas en la base
de datos 
b. Reciba en la query string los parámetros (2 puntos):
i. limits: Limita la cantidad de joyas a devolver por página
ii. page: Define la página
iii. order_by: Ordena las joyas según el valor de este parámetro, ejemplo:
stock_ASC 

Hacer uso de los middlewares como capa de reporte en cada una de las rutas.
*/

app.get("/joyas", async (req, res) => {
  const queryStrings = req.query;
  const listado_joyas = await obtenerListadoJoyas(queryStrings);
  if (!listado_joyas) {
    res.status(500).send("Error al obtener el listado");
  } else {
    res.json(listado_joyas);
  }
});

/* Crear una ruta GET /joyas/filtros que reciba los siguientes parámetros en la query
string:
a. precio_max: Filtrar las joyas con un precio mayor al valor recibido
b. precio_min: Filtrar las joyas con un precio menor al valor recibido.
c. categoria: Filtrar las joyas por la categoría
d. metal: Filtrar las joyas por la categoría */
app.get("/joyas/filtros", async (req, res) => {
  const { precio_min, precio_max, categoria, metal } = req.query;
  const listado_joyas_filtrado = await obtenerListadoJoyasFiltrado({
    precio_min,
    precio_max,
    categoria,
    metal,
  });
  if (!listado_joyas_filtrado) {
    res.status(500).send("Error al obtener el listado filtrado de joyas");
  } else {
    res.json(listado_joyas_filtrado);
  }
});
