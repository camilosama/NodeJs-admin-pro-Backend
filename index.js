require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./dataBase/config')

//crear servidor express
const app = express();

//configurar CORS
app.use(cors());

//lectura y parseo del body
app.use(express.json());

//conectar a base de datos 
dbConnection();

//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));



//levantar Servidor
app.listen(process.env.PORT, () => {
    console.log(`servidor ok en puerto ${process.env.PORT}`);
});