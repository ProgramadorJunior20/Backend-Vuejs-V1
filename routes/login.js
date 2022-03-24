import express from "express";
const router = express.Router();

// JWT
const jwt = require('jsonwebtoken');

// Importamos modelo Tarea
import User from "../models/user";

// Hash Contraseña
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/', async(req, res) => {
    
    const body = req.body;
    const msj = 'Email o Contaseña Incorrectos'

    try {
        // Buscamos email en DB
        const usuarioDB = await User.findOne({email: body.email});
        
        // Evaluamos si existe el usuario en DB
        if (!usuarioDB) {
            return res.status(400).json({
                mensaje: msj
            })
        }
        
        // Evaluamos la contraseña correcta
        if(!bcrypt.compareSync(body.pass, usuarioDB.pass)){
            return res.status(400).json({
                mensaje: msj
            })
        }

        // Generar Token
        let token = jwt.sign({
            data: usuarioDB
        }, process.env.SECRETORPRIVATEKEY, { expiresIn: 60 * 60 * 24 * 30}) // Expira en 30 días

        // Pasó las validaciones
        res.status(200).json(
            {
                usuarioDB,
                token
            }
        )

        
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
})

module.exports = router;