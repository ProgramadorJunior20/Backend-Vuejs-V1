// JWT
const jwt = require('jsonwebtoken');

const verificarAuth = (req, res, next) => {

    const token = req.get('access-token');
    
    jwt.verify(token, process.env.SECRETORPRIVATEKEY, (err, decoded) => { 
        
        if(err){
            res.status(401).json({
                mensaje: 'Usuario no es válido'
            })
        }

        req.usuario = decoded.data;

        next();
    });
}

const verificarAdministrador = (req, res, next) => {

    const rol = req.usuario.role

    if (rol === 'ADMIN') {
        next();
    }else{
        res.status(401).json({
            mensaje: 'El usuario no es admin no puede ejecutar esta acción'
        })
    }
}

module.exports = {verificarAuth, verificarAdministrador};