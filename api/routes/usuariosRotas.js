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

//rota para listar os usuarios
router.get('/', async (req, res) => {
    try {
        const usuariosDados = await db.collection('usuarios').get();
        const usuarios = [];
        usuariosDados.forEach((doc) => {
            usuarios.push({ id: doc.id, ...doc.data() });
        });
        res.json(usuarios);
    } catch (error) {
        console.error('Erro ao listar usuário:', error);
        res.status(500).json({ error: 'Erro ao listar usuário' });
    }
})

//rota para buscar usuario específico
router.get('/:id', async (req,res) => {
    const id_usuario = req.params.id;

    if (!id_usuario) {
        return res.status(400).json({ error: 'ID do usuário é obrigatório' });
    }

    try {
        const usuarioDados = await db.collection('usuarios').doc(id_usuario).get();
        if (!usuarioDados.exists) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.status(200).json({ id: usuarioDados.id, ...usuarioDados.data() });
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
})

//rota para atualizar usuario
router.put('/atualizar/:id', async (req,res) => {
    const id_usuario = req.params.id;
    const { nome, email, tipo, campus, foto, pode_dirigir } = req.body;

    if (!id_usuario){
        return res.status(400).json({ error: 'ID do usuário é obrigatório' });
    }

    try {
        const usuariosDados = await db.collection('usuarios').doc(id_usuario).get();
        if (!usuariosDados.exists) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const dadosAtualizados = {
            nome: nome || usuariosDados.data().nome,
            email: email || usuariosDados.data().email,
            tipo: tipo || usuariosDados.data().tipo,
            campus: campus || usuariosDados.data().campus,
            foto: foto || usuariosDados.data().foto,
            pode_dirigir: pode_dirigir !== undefined ? pode_dirigir : usuariosDados.data().pode_dirigir,
            atualizado_em: new Date()
        }

        await db.collection('usuarios').doc(id_usuario).update(dadosAtualizados);
        res.json({ id: id_usuario, ...dadosAtualizados });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
})

//rota deletar usuario
router.delete('/:id', async (req,res) => {
    const id_usuario = req.params.id;

    try {
        const usuario = await db.collection('usuarios').doc(id_usuario).get();

        if (!usuario.exists) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        await db.collection('usuarios').doc(id_usuario).delete();

        res.json({ message: 'Usuário deletado com sucesso' });

    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
})


module.exports = router;