import express from 'express';

const router = express.Router();

// importar el modelo Nota
import Nota from '../models/nota';


//agregar una nota
router.post('/nueva-nota', async (req, res) => {

    const body = req.body;

    try {
        
        const notaDB = await Nota.create(body);
        res.status(200).json(notaDB);
    } catch (error) {
        return res.status(500).json({
            msg: 'Ocurrio un error',
            error
        })
    }
});

// GET con parámetros 
router.get('/nota/:id', async(req, res) => { 
    
    const _id = req.params.id;
    
    try {
        const notaDB = await Nota.findOne({_id}); 
        res.status(200).json(notaDB);
    } catch (error) {
        return res.status(400).json({
            msg: `Ocurrio un error ${_id} no encotrado.`,
            error
        })
    }
});

// Get con todos los documentos
router.get('/nota', async(req, res) => {
    try {
        const notaDB = await Nota.find();
        res.status(200).json(notaDB);
    } catch (error) {
        return res.status(400).json({
            msg: `Ocurrio un error`,
            error
        })
    }
});

// Delete eliminar una nota
router.delete('/nota/:id', async(req, res) => {
    const _id = req.params.id; 
    try {
        const notaDB = await Nota.findByIdAndDelete({_id});
        if(!notaDB){
            return res.status(400).json({
                mensaje: 'No se encontró el id indicado',
                error
            })
        }
        res.status(200).json(notaDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    } 
});

// Put actualizar una nota
router.put('/nota/:id', async(req, res) => {
    const _id = req.params.id;
    const body = req.body;
    try {
        const notaDB = await Nota.findByIdAndUpdate(_id, body, {new: true});
        res.status(200).json(notaDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});

// Exportamos la configuración de express app
module.exports = router;