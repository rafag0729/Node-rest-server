const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, emailExiste } = require('../helpers/db-validators');
const { 
    usuariosGet, 
    usuariosPost, 
    usuariosPut, 
    usuariosDelete, 
    usuariosPatch 
} = require('../controllers/usuarios');


const router = Router();

router.get('/', usuariosGet )

router.put('/:id', usuariosPut )

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener más de 6 caracteres').isLength({min: 6}),
    check('correo', 'El correo no es válido').isEmail(),
    // check('rol', 'No es un rol permitido').isIn('ADMIN_ROLE', 'USER_ROLE'),
    check('rol').custom( esRolValido ),
    check('correo').custom( emailExiste ),
    validarCampos
], usuariosPost )

router.delete('/', usuariosDelete )

router.patch('/', usuariosPatch )

module.exports = router;