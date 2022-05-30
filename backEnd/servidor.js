require('dotenv').config();

const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require('cors');

//conexion de la base de datos
mongoose
    .connect(process.env.DBPASS)
    .then((db)=>{
        console.log('Conectado a la base de datos');
    }).catch((err)=>{
        console.log('Ocurrio un error al conectar la base de datos', err);
    })

//inicializacion de la app
const app = express();
const PORT = process.env.PORT
const tareaDb = require('../backEnd/models/tarea')

//Configuraciones
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json())

//Rutas de conexion
app.get('/tareas', async(req,res)=>{
    // const data = req.body.tarea;
    // const hoy = new Date();
    // var fecha = hoy.getDate()+"/"+(hoy.getMonth()+1)+"/"+hoy.getFullYear();
    // var hora = hoy.getHours()+":"+hoy.getMinutes()+":"+hoy.getSeconds();
    // res.send(fecha+" "+hora+" "+"<strong>"+data+"</strong>");
    // res.send({mensage:'Conectado'});
    let doc = await tareaDb.find();
    res.send(doc);
    
})
app.post('/tareas', async(req,res)=>{
    let doc = req.body;
    console.log(doc)
    await new tareaDb(doc).save();
    res.send({mensaje:'datos guardados'});

})
app.delete('/tareas/:id', async(req,res)=>{
    let id_t = req.params.id;
    // console.log(id_t)
    await tareaDb.findByIdAndDelete(id_t);
    res.send({mensaje:'eliminado'})
})
app.put('/tarease/:id', async(req,res)=>{
    let id_t = req.params.id;
    let doc = req.body
    await tareaDb.updateOne({_id:id_t}, doc);
    res.send({mensaje:'actualizado'});
})
//Listen
app.listen(PORT,()=>{
    console.log('Estamos conectados en el puerto', PORT);
})