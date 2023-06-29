import { Schema, model } from "mongoose";

const productoSchema = new Schema({
  nombreProducto: {
    type: String,
    minLength: 2,
    maxLength: 100,
    required: true,
    unique: true,
  },
  // precio: {
  //   type: Number,
  //   min: 1,
  //   max: 10000,
  //   required: true,
  // },
  precio: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => {
        return value >= 1 && value <= 10000;
      },
      message: "El precio debe estar entre 1 y 10000",
    },
  },
  imagen: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
});

const Producto = model("producto", productoSchema);

export default Producto;
