const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


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

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});
    
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    await usuario.save();

    res.status(201).json({
        msg: 'post Api - controlador',
        usuario
    })
}

const usuariosPut = async(req, res) => {
    const { id } = req.params;
    const { password, google, correo, ...rest } = req.body;

    // ToDo validar contra base de datos
    if(password){
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate(id, rest)
    
    res.status(400).json({
        msg: 'put Api - controlador',
        usuario
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