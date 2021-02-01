require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./dataBase/config')

//crear servidor express
const app = express();

//configurar CORS
app.use(cors());

//conectar a base de datos 
dbConnection();

app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola Mundo'
    })
});

//levantar Servidor
app.listen(process.env.PORT, () => {
    console.log(`servidor ok en puerto ${process.env.PORT}`);
});