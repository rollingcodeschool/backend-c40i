import express from 'express';

//Tomar un puerto
//crear una instancia de express
const app = express();
//crear una variable para guardar un puerto
app.set('port', process.env.PORT || 4000);
app.listen( app.get('port'), ()=>{
    console.log('Estoy en el puerto '+app.get('port'))
})

//middleware

//rutas