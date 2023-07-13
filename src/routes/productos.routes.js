import { Router } from "express";
import {
  borrarProducto,
  crearProducto,
  editarProducto,
  obtenerProducto,
  obtenerProductos,
} from "../controllers/productos.controllers";
import validarProducto from "../helpers/validarProducto";
import validarJWT from "../helpers/token-verify";

const router = Router();

// app.get('/productos', (req, res) => {
//   res.send('Esto fue una peticion get')
//   })

router
  .route("/productos")
  .get(obtenerProductos)
  .post([validarJWT,validarProducto], crearProducto);
router
  .route("/productos/:id")
  .delete(validarJWT,borrarProducto)
  .put([validarJWT,validarProducto], editarProducto)
  .get(obtenerProducto);

export default router;
