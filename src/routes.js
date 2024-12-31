const express = require('express');
const router = express.Router();
const pool = require('./db');


// Listar todos os livros
router.get('/livros', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM livros');
        res.json(rows);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

// Cadastrar um novo livro
router.post('/livros', async (req, res) => {
    const { nome_autor, editora, ano_publicacao, nome_obra, descricao_obra } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO livros (nome_autor, editora, ano_publicacao, nome_obra, descricao_obra) VALUES (?, ?, ?, ?, ?)',
            [nome_autor, editora, ano_publicacao, nome_obra, descricao_obra]
        );
        res.status(201).json({ id: result.insertId });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

// Atualizar um livro
router.put('/livros/:id', async (req, res) => {
    const { id } = req.params;
    const { nome_autor, editora, ano_publicacao, nome_obra, descricao_obra} = req.body;
    try{
        await pool.query(
            'UPDATE livros SET nome_autor = ?, editora = ?, ano_publicacao = ?, nome_obra = ?, descricao_obra = ? WHERE id = ?',
            [nome_autor, editora, ano_publicacao, nome_obra, descricao_obra, id]
        );
        res.json( { message: 'Livro atualizado com sucesso' } );
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

// Deletar livro
router.delete('/livros/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM livros WHERE id = ?', [id]);
        res.json({ message:'Livro deletado com sucesso' });
    }catch(err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;