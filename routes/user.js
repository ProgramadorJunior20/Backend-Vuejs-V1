import express from "express";
const router = express.Router();

// Importamos modelo Tarea
import User from "../models/user";

// Importamos Middleware
const {verificarAuth, verificarAdministrador} = require('../middlewares/autenticacion');

// Hash Contraseña
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Filtrar campos de PUT
const _ = require('underscore');

// POST
router.post('/nuevo-usuario', [verificarAuth, verificarAdministrador] , async(req, res) => {
    
    const body = {
        nombre: req.body.nombre,
        email: req.body.email,
        role: req.body.role
      }
    
    body.pass = bcrypt.hashSync(req.body.pass, saltRounds);

    try {
        
        const usuarioDB = await User.create(body);
        res.status(200).json(usuarioDB);

    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});

// PUT usuario
router.put('/usuario/:id', [verificarAuth, verificarAdministrador], async(req, res) => {

    const _id = req.params.id;
    const body = _.pick(req.body, ['nombre', 'email', 'pass', 'activo']);

    if(body.pass){
        body.pass = bcrypt.hashSync(req.body.pass, saltRounds);
    }

    try {

        const usuarioDB = await User.findByIdAndUpdate(_id, body, {new: true, runValidators: true});
        res.status(200).json(usuarioDB);

    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});

// DELETE usuario
router.delete('/usuario/:id', [verificarAuth, verificarAdministrador], async(req, res) => {

    let _id = req.params.id;

    try {

        const usuarioDelete = await User.findByIdAndRemove(_id);

        if (!usuarioDelete) {
            return res.status(400).json({
                mensaje: 'Usuario no encontrado'
            })
        }

        res.status(200).json(usuarioDelete);
        
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});

module.exports = router;