import Usuario from "../models/usuario";

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
       const nuevoUsuario = new Usuario(req.body)
       await nuevoUsuario.save()
       res.status(201).json({mensaje:"Se creo un nuevo usuario"})
    } catch (error) {
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
        if(usuario.password !== password){
            return res.status(400).json({
                mensaje: 'Correo o password invalido (password)'
            })
        }
        //responder al front que el usuario es correcto
        res.status(200).json({
            mensaje:'El usuario existe',
            nombreUsuario: usuario.nombreUsuario,
            uid: usuario._id
        })
    } catch (error) {
        console.log(error)
        res.status(404).json('Error al loguear un usuario');
    }
}