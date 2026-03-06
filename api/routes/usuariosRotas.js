const express = require('express');
const db = require('../firebase');
const router = express.Router();

// Rota para criar um novo usuário
router.post('/criar', async (req,res) => {
    const { nome, email, tipo, campus, foto, pode_dirigir } = req.body;

    if (!nome || !email || !tipo) {
        return res.status(400).json({
            error: 'Nome, email e tipo são obrigatórios' 
        });
    }
    
    try {
        const dadosUsuario = {
            nome,
            email,  
            tipo,
            campus,
            foto,
            pode_dirigir,
            criado_em: new Date()
        }

        const enviarUsuario = await db.collection('usuarios').add(dadosUsuario);
        res.status(201).json({ id: enviarUsuario.id, ...dadosUsuario });
    }catch (error){
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
})

module.exports = router;