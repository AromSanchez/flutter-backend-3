const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/empresa.controller');
const verifyToken = require('../middlewares/auth.middleware');

router.post('/', verifyToken, ctrl.createEmpresa);
router.get('/', verifyToken, ctrl.getAll);
router.get('/:id', verifyToken, ctrl.getById);
router.put('/:id', verifyToken, ctrl.updateEmpresa);
router.delete('/:id', verifyToken, ctrl.deleteEmpresa);

module.exports = router;