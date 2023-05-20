const format = require("pg-format");
const pool = require("./conexion");

const obtenerListadoJoyasBD = async (limits, order_by, page) => {
  /*
 Usar try catch para capturar los posibles errores durante una consulta y la lógica de cada ruta creada.
  */
  try {
    let [campo, direccion] = order_by.split("_");
    direccion = direccion.toUpperCase();
    const offset = (page - 1) * limits;
    /*
    Usar las consultas parametrizadas para evitar el SQL Injection en la consulta a la base de datos relacionada con la ruta GET /joyas/filtros
    */
    const consulta_formateada = format(
      "SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s",
      campo,
      direccion,
      parseInt(limits),
      offset
    );

    const { rows } = await pool.query(consulta_formateada);

    return rows;
  } catch (e) {
    return false;
  }
};

const obtenerListadoJoyasFiltradoBD = async (
  precio_min = null,
  precio_max = null,
  categoria = null,
  metal = null
) => {
  let consulta_formateada = "SELECT * FROM inventario";
  let marcadores = [];
  /*
a. precio_max: Filtrar las joyas con un precio mayor al valor recibido
b. precio_min: Filtrar las joyas con un precio menor al valor recibido.
c. categoria: Filtrar las joyas por la categoría
d. metal: Filtrar las joyas por la categoría 
*/
  if (precio_min || precio_max || categoria || metal) {
    consulta_formateada += " WHERE";
    //Para mantener la consulta SQL formateada, utilizo marcadores de posición desde el array maracadores
    if (precio_min) {
      consulta_formateada += ` precio >= $${marcadores.length + 1}`;
      marcadores.push(precio_min);
    }

    if (precio_min && precio_max) {
      consulta_formateada += " AND";
    }

    if (precio_max) {
      consulta_formateada += ` precio <= $${marcadores.length + 1}`;
      marcadores.push(precio_max);
    }

    if ((precio_min || precio_max) && (categoria || metal)) {
      consulta_formateada += " AND";
    }

    if (categoria) {
      consulta_formateada += ` categoria = $${marcadores.length + 1}`;
      marcadores.push(categoria);
    }

    if (categoria && metal) {
      consulta_formateada += " AND";
    }

    if (metal) {
      consulta_formateada += ` metal = $${marcadores.length + 1}`;
      marcadores.push(metal);
    }
  }

  try {
    const { rows } = await pool.query(consulta_formateada, marcadores);
    return rows;
  } catch (e) {
    return false;
  }
};

module.exports = { obtenerListadoJoyasBD, obtenerListadoJoyasFiltradoBD };
