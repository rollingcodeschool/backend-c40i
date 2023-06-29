import { Router } from "express";
import {
  borrarProducto,
  crearProducto,
  editarProducto,
  obtenerProducto,
  obtenerProductos,
} from "../controllers/productos.controllers";
import { check } from "express-validator";

const router = Router();

// app.get('/productos', (req, res) => {
//   res.send('Esto fue una peticion get')
//   })

router
  .route("/productos")
  .get(obtenerProductos)
  .post([check("nombreProducto").notEmpty().withMessage('El nombre del producto es obligatorio')], crearProducto);
router
  .route("/productos/:id")
  .delete(borrarProducto)
  .put(editarProducto)
  .get(obtenerProducto);

export default router;
