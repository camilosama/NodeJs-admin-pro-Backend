const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
//const usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        //Verificar que el usuario exista
        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no registrado en el sistema'
            });
        }

        //Verificar contraseña
        const validarPw = bcryptjs.compareSync(password, usuarioDB.password);

        if (!validarPw) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            });
        }

        //Generar token - JWT
        const token = await generarJWT(usuarioDB.id)

        res.json({
            ok: true,
            msg: token
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Error Insesperado ver LOGS'
        });
    }
}

module.exports = {
    login
}