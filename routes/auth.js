/*
    Ruta: /api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos')

const { login } = require('../controllers/auth');

const router = Router();


router.post('/', [
    check('email', 'El email es requerido').isEmail(),
    check('password', 'Es necesario adicionar la clave').not().isEmpty(),
    validarCampos
], login)


module.exports = router;