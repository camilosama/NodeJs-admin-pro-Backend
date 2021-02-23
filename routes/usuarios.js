/*
    Ruta: /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos')
const { getUsuarios, crearUsuarios, actualizarUsuarios, eliminarUsuarios } = require('../controllers/usuarios');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();


router.get('/', validarJWT, getUsuarios);
router.post('/', [
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('password', 'Es necesario adicionar una clave').not().isEmpty(),
    check('email', 'El email es necesario').isEmail(),
    validarCampos,
], crearUsuarios);
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('email', 'El email es necesario').isEmail(),
    check('rol', 'El rol es requerido').not().isEmpty(),
    validarCampos,

], actualizarUsuarios);

router.delete('/:id', validarJWT, eliminarUsuarios)

module.exports = router;