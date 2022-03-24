import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const uniqueValidator = require('mongoose-unique-validator');

const roles = {
    values: ['ADMIN', 'USER'],
    message: '{VALUE} rol no válido'
}

const userSchema = new Schema({

    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    email: {
        type: String, 
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    pass: {type: String, required: [true, 'El pass es obligatorio']},
    date: {type: Date, default: Date.now},
    role: { type: String, default: 'USER', enum: roles },
    activo: {type: Boolean, default: true}

});

userSchema.plugin(uniqueValidator, { message: 'Error, El {PATH} ya existe debe ser único.' });

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.pass;
    return obj;
}

const User = mongoose.model('User', userSchema);

export default  User;