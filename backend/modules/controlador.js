const {
  obtenerListadoJoyasBD,
  obtenerListadoJoyasFiltradoBD,
} = require("./consultasJoyas");

const obtenerListadoJoyas = async ({
  limits = 10,
  order_by = "id_ASC",
  page = 1,
}) => {
  const resultado = await obtenerListadoJoyasBD(limits, order_by, page);
  let resultado_final = [];
  if (resultado.length > 0) {
    let results = [];
    let stockTotal = 0;
    resultado.forEach((element) => {
      let objResultado = {
        name: element.nombre,
        href: `/joyas/joya/${element.id}`,
      };
      stockTotal += element.stock;
      results.push(objResultado);
    });

    resultado_final = {
      totalJoyas: resultado.length,
      stockTotal: stockTotal,
      results: results,
    };
  }
  return resultado_final;
};

const obtenerListadoJoyasFiltrado = async ({
  precio_min,
  precio_max,
  categoria,
  metal,
}) => {
  const resultado = await obtenerListadoJoyasFiltradoBD(
    precio_min,
    precio_max,
    categoria,
    metal
  );
  /* Las lineas comentadas devulven la respuesta en estructura de datos HATEOAS, mientras que las lineas no comentadas retornan tal cual el requerimiento del desafío */
  let resultado_final = [];
  if (resultado.length > 0) {
    let results = [];
    //let stockTotal = 0;
    resultado.forEach((element) => {
      /*let objResultado = {
        name: element.nombre,
        href: `/joyas/joya/${element.id}`,
        precio: element.precio,
        categoria: element.categoria,
        metal: element.metal
      };*/
      let objResultado = {
        id: element.id,
        nombre: element.nombre,
        categoria: element.categoria,
        metal: element.metal,
        precio: element.precio,
        stock: element.stock,
      };
      //stockTotal += element.stock;
      results.push(objResultado);
    });

    /*resultado_final = {
      totalJoyas: resultado.length,
      stockTotal: stockTotal,
      results: results,
    };*/
    resultado_final = results;
  }
  return resultado_final;
};

module.exports = {
  obtenerListadoJoyas,
  obtenerListadoJoyasFiltrado,
};
