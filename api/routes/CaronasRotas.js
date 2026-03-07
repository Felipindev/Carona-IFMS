const express = require('express');
const db = require('../firebase');
const admin = require('firebase-admin')
const router = express.Router();

//rotas feitas: Criar carona e entrar em uma carona

router.post('/', async (req, res) => {
    const {
        id_motorista,
        origem, 
        destino,
        data_hora,
        vagas
    } = req.body;

    if (!id_motorista || !origem || !destino || !data_hora || !vagas) {
        return res.status(400).json({
            error: 'Todos os campos são obrigatórios' 
        });
    }

    //verificar se o motorista pode dirigir
    //nao fiz if(id_motorista) pq ja verifiquei no codigo acima
    try {
        const usuario = await db.collection('usuarios').doc(id_motorista).get(); //.get() pega todos os dados
        if (!usuario.exists) {
            return res.status(404).json({ error: 'Motorista não encontrado' });
        }

        if (!usuario.data().pode_dirigir) { //verifica o campo pode_dirigir do usuario
            return res.status(403).json({ 
                error: 'Motorista não autorizado para dirigir' 
            });
        }
    } catch (error) {
        console.log("erro: não foi possivel validar o motorista" , error);
        res.status(500).json({ error: 'Erro ao validar motorista' });
    }
   

    try {
        const dadosCarona = {
            id_motorista,
            origem, 
            destino,
            data_hora: new Date(data_hora),
            passageiros: [],
            status: 'ativa',
            vagas,
            criado_em: new Date()
        }
        const enviarCarona = await db.collection('caronas').add(dadosCarona);
        res.status(201).json({ id: enviarCarona.id, ...dadosCarona });
    } catch (error) {
        console.log("erro: não foi possivel criar a carona" , error);
        res.status(500).json({ error: 'Erro ao criar carona' });
    }
})

//rota para pegar uma carona
router.post('/:id/entrar', async (req,res) => {
    const id_carona = req.params.id
    const {id_usuario } = req.body

    if (!id_carona || !id_usuario) {
        return res.status(400).json({
            error: 'id_carona e id_usuario são obrigatórios'
        })
    }

    try {
        const carona = await db.collection('caronas').doc(id_carona).get();
        if (!carona.exists) {
            return res.status(404).json({ error: 'Carona não encontrada' });
        }

        const dadosCarona = carona.data();

        if (dadosCarona.status !== 'ativa') {
            return res.status(400).json({ error: 'Carona não está ativa' });
        }

        if(dadosCarona.id_motorista === id_usuario) {
            return res.status(403).json({ error: 'Motorista não pode entrar como passageiro' });
        }

        if (dadosCarona.passageiros.length >= dadosCarona.vagas) {
            return res.status(403).json({ error: 'Carona cheia' });
        }

        if (dadosCarona.passageiros.includes(id_usuario)) {
            return res.status(403).json({ error: 'Usuário já está na carona' });
        }

        //adicionar usuario ao array de passageiros
        await db.collection('caronas').doc(id_carona).update({
            passageiros: admin.firestore.FieldValue.arrayUnion(id_usuario)
        })

        res.status(200).json({ message: 'Usuário entrou na carona com sucesso' });
    } catch (error) {
        console.log("erro: não foi possivel entrar na carona" , error);
        res.status(500).json({ error: 'Erro ao entrar na carona' });
    }
})

//rota para listar as caronas
router.get('/', async (req, res) => {
    try {
        const caronasDados = await db.collection('caronas').get();
        const caronas = [];
        caronasDados.forEach((doc) => {
            caronas.push({ id: doc.id, ...doc.data() });
        });
        res.json(caronas);
    } catch (error) {
        console.log("erro: não foi possivel listar as caronas" , error);
        res.status(500).json({ error: 'Erro ao listar as caronas' });
    }
})

//carona especifica
router.get('/:id', async (req, res) => {
    const id_carona = req.params.id;

    if (!id_carona) {
        return res.status(400).json({ error: 'ID da carona é obrigatório' });
    }

    try {
        const caronaDados = await db.collection('caronas').doc(id_carona).get();
        if (!caronaDados.exists) {
            return res.status(404).json({ error: 'Carona não encontrada' });
        }
        res.json({ id: caronaDados.id, ...caronaDados.data() });
    } catch (error) {
        console.log("erro: não foi possivel listar a carona" , error);
        res.status(500).json({ error: 'Erro ao listar a carona' });
    }
})

//sair da carona
router.post('/:id/sair', async (req, res) => {
    const id_carona = req.params.id;
    const { id_usuario } = req.body;

    try {
        const carona = await db.collection('caronas').doc(id_carona).get();
        if (!carona.exists) {
            return res.status(404).json({ error: 'Carona não encontrada' });
        }

        const dadosCarona = carona.data();

        if (!dadosCarona.passageiros.includes(id_usuario)) {
            return res.status(403).json({ error: 'Usuário não está na carona' });
        }

        //arrayRemove pra tirar o usuario dos passageiros
        await db.collection('caronas').doc(id_carona).update({
            passageiros: admin.firestore.FieldValue.arrayRemove(id_usuario)
        })
        res.status(200).json({ message: 'Usuário saiu da carona com sucesso' });
    } catch (error) {
        console.log("erro: não foi possivel sair da carona" , error);
        res.status(500).json({ error: 'Erro ao sair da carona' });
    }
})

//cancelar carona status = cancelada
router.post('/:id/cancelar', async (req, res) => {
    const id_carona = req.params.id;
    const id_usuario = req.body.id_usuario;

    if (!id_carona || !id_usuario) {
        return res.status(400).json({ error: 'ID da carona e ID do usuário é obrigatório' });
    }

    try {
        const carona = await db.collection('caronas').doc(id_carona).get();
        const dadosUsuario = await db.collection('usuarios').doc(id_usuario).get();

        if (!dadosUsuario.exists) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        if (!carona.exists) {
            return res.status(404).json({ error: 'Carona não encontrada' });
        }

        if (carona.data().id_motorista !== id_usuario) {
        return res.status(403).json({ error: 'Apenas o motorista pode cancelar a carona' });
        }


        await db.collection('caronas').doc(id_carona).update({
            status: 'cancelada'
        })
        res.status(200).json({ message: 'Carona cancelada com sucesso' });
    } catch (error) {
        console.log("não foi possível cancelar a carona", error);
        res.status(500).json({ error: 'Erro ao cancelar a carona' });
        
    }
})

// exporta o router para uso em app.js
module.exports = router;