import generarJWT from "../helpers/token-sign";
import Usuario from "../models/usuario";
import bcrypt from 'bcrypt';

export const obtenerUsuarios = async(req,res) =>{
    try {
        const usuarios = await Usuario.find()
        res.status(200).json(usuarios)
    } catch (error) {
        res.status(404).json(error)
    }
}

export const obtenerUnUsuario = async(req,res) =>{
    try {
        const usuario = await Usuario.findById(req.params.id)
        res.status(200).json(usuario)
    } catch (error) {
        res.status(404).json({mensaje:"Error al buscar el usuario"})
    }
}
export const crearUsuario = async(req,res) =>{
    try {
        //verificar que si el mail ya existe 
        let consultaUsuario = await Usuario.findOne({email: req.body.email});
        //si el usuario existe
        if(consultaUsuario){
            return res.status(400).json({ mensaje: 'ya existe un usuario con el correo enviado'})
        }

       const nuevoUsuario = new Usuario(req.body);
       //encriptar la contraseña
       const salt = bcrypt.genSaltSync(10);
       nuevoUsuario.password = bcrypt.hashSync(nuevoUsuario.password, salt); 
       await nuevoUsuario.save();
       res.status(201).json({mensaje:"Se creo un nuevo usuario"})
    } catch (error) {
        console.log(error)
        res.status(400).json(error.message)
    }
}

export const login = async(req, res)=>{
    try {
        //verificar si existe email en la BD
        const {email, password} = req.body;
        let usuario = await Usuario.findOne({email});
        //si no existe el usuario
        if(!usuario){
            return res.status(404).json({
                mensaje: 'Correo o password invalido (correo)'
            })
        }
        //preguntar si el el password no coincide
        const passwordValido = bcrypt.compareSync(password, usuario.password)
        //si el password no es valido, es decir es false
        if(!passwordValido){
            return res.status(400).json({
                mensaje: 'Correo o password invalido (password)'
            })
        }
        //generar el token
        const token = await generarJWT(usuario._id, usuario.nombreUsuario);
        //responder al front que el usuario es correcto
        res.status(200).json({
            mensaje:'El usuario existe',
            nombreUsuario: usuario.nombreUsuario,
            uid: usuario._id,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(404).json('Error al loguear un usuario');
    }
}