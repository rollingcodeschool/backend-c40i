import { Router } from "express";
import {
  borrarProducto,
  crearProducto,
  editarProducto,
  obtenerProducto,
  obtenerProductos,
} from "../controllers/productos.controllers";
import validarProducto from "../helpers/validarProducto";

const router = Router();

// app.get('/productos', (req, res) => {
//   res.send('Esto fue una peticion get')
//   })

router
  .route("/productos")
  .get(obtenerProductos)
  .post(validarProducto, crearProducto);
router
  .route("/productos/:id")
  .delete(borrarProducto)
  .put(validarProducto, editarProducto)
  .get(obtenerProducto);

export default router;
