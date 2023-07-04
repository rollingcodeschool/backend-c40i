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
  .post(
    [
      check("nombreProducto")
        .notEmpty()
        .withMessage("El nombre del producto es obligatorio")
        .isLength({ min: 2, max: 100 })
        .withMessage(
          "El nombre del producto debe contener entre 2 y 100 caracteres"
        ),
      check("precio")
        .notEmpty()
        .withMessage("El precio es un dato obligatorio")
        .isNumeric()
        .withMessage("El precio debe tener un formato numerico")
        .custom((value) => {
          if (value >= 1 && value <= 10000) {
            return true;
          } else {
            throw new Error("El precio debe ser entre 1 y 10000");
          }
        }),
      check("imagen")
        .notEmpty()
        .withMessage("La dirección de la imagen es obligatoria")
        .matches(
          /^(https?:\/\/)?(?:www\.)?[\w-]+\.[\w.-]+(?:\/[\w-./?%&=]*)?\.(?:jpg|jpeg|png|gif|bmp|jpeg\?[\w=&.]*)$/
        )
        .withMessage("Debe ingresar una url de imagen valida"),
    ],
    crearProducto
  );
router
  .route("/productos/:id")
  .delete(borrarProducto)
  .put(editarProducto)
  .get(obtenerProducto);

export default router;
