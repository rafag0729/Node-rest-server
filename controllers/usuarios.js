const { response, request } = require('express');
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
    const usuario = new Usuario(body);

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