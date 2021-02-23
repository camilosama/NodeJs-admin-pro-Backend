const jwt = require('jsonwebtoken');
const validarJWT = (req, res, next) => {

    //Leer el token
    const token = req.header('x-token');
    console.log(token);
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Token inexistente en la solicitud'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.uid = uid;
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido '
        });
    }


}

module.exports = {
    validarJWT
}