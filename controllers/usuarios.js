const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async(req, res) => {
    const usuarios = await Usuario.find({}, 'nombre email role google');
    res.json({
        ok: true,
        usuarios,
        uid: req.uid
    })
}


const crearUsuarios = async(req, res = response) => {

    const { email, password, nombre } = req.body;

    try {
        // Verificar si ya esta registrado el Email
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Email ya registrado'
            });
        }
        //Crear usuario bajo el modelo Usuarios
        const usuario = new Usuario(req.body);
        //encriptar con la funcion bcryptjs
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);
        //grabar usuario en la base de datos
        await usuario.save();
        //Enviar respuesta de la solicitud

        //Generar token - JWT
        const token = await generarJWT(usuario.id)

        res.json({
            ok: true,
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Insesperado ver LOGS'
        });
    }
}

const actualizarUsuarios = async(req, res = response) => {

    const uid = req.params.id;

    try {

        //TODO: validar token y si es el usurio correcto
        const usuarioDb = await Usuario.findById(uid);

        if (!usuarioDb) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario inexistente"
            });
        }

        //Actualzar datos
        const { password, google, email, ...campos } = req.body;

        if (usuarioDb.email !== email) {
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Email ya registrado'
                });
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            msg: usuarioActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Insesperado ver LOGS'
        });
    }
}

const eliminarUsuarios = async(req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDb = await Usuario.findById(uid);

        if (!usuarioDb) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario inexistente"
            });
        }

        await Usuario.findOneAndDelete(uid);

        res.status(200).json({
            ok: true,
            msg: "Usuario Eliminado"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Insesperado ver LOGS'
        });
    }

}

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuarios,
    eliminarUsuarios
}