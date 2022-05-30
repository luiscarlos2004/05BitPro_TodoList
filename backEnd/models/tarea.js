const mongoose = require('mongoose');
const {Schema, model} = mongoose;

let tarea = new Schema({
    tipo:{
        type:String,
        default:'otro'
    },
    autor:String,
    mensaje:String,
    fecha:{
        type:Date,
        default:new Date()
    },
    hora:{
        type:Date,
        default: new Date() 
    },
    etiqueta:String,
    urgencia:String,
    fechaFinal:String
})

module.exports = model('tarea',tarea);