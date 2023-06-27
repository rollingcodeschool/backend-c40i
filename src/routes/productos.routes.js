import { Router } from 'express';
import {
  crearProducto,
  obtenerProductos,
} from '../controllers/productos.controllers';

const router = Router();

// app.get('/productos', (req, res) => {
//   res.send('Esto fue una peticion get')
//   })

router.route('/productos').get(obtenerProductos).post(crearProducto);

export default router;
