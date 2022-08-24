const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator'); 

const Usuario = require('../models/usuario');


const usuariosGet = (req = request, res = response ) => {
    const { nombre, q, lastname = 'No lastname'} = req.query;
    res.json({
        msg: 'get Api - controlador',
        nombre,
        q,
        lastname
    })
}

const usuariosPost = async(req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors); 
    }

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});
    console.log({usuario})

    // Verificar que el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if( existeEmail ){
        return res.status(400).json({
            msg: 'El correo ya esta registrado'
        })
    }

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    await usuario.save();

    res.status(201).json({
        msg: 'post Api - controlador',
        usuario
    })
}

const usuariosPut = (req, res) => {
    const { id } = req.params;
    res.status(400).json({
        msg: 'put Api - controlador',
        id
    })
}

const usuariosDelete = (req, res) => {
    res.status(500).json({
        msg: 'delete Api - controlador',
    })
}

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch Api - controlador',
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
}