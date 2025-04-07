const { pool } = require('../config');
const Categoria = require('../entities/Categoria');

const getCategoriasDB = async () => {
    try {
        const { rows } = await pool.query(`SELECT * FROM categorias ORDER BY nome`);
        return rows.map((categoria) => new Categoria(categoria.codigo, categoria.nome, categoria.descricao));
    } catch (err) {
        throw "Erro: " + err;
    }
}

const deleteCategoriaDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM categorias WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return `Categoria de código ${codigo} removida com sucesso!`;
        }
    } catch (err) {
        throw "Erro ao remover a categoria: " + err;
    }
}

const addCategoriaDB = async (objeto) => {
    try {
        const { nome, descricao } = objeto;
        await pool.query(`INSERT INTO categorias (nome, descricao) VALUES ($1, $2)`, [nome, descricao]);        
    } catch (err) {
        throw "Erro ao inserir a categoria: " + err;
    }
}

const updateCategoriaDB = async (objeto) => {
    try {
        const { codigo, nome, descricao } = objeto;        
        const results = await pool.query(`UPDATE categorias SET nome = $2, descricao = $3 WHERE codigo = $1`, [codigo, nome, descricao]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
    } catch (err) {
        throw "Erro ao alterar a categoria: " + err;
    }
}

const getCategoriaPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT * FROM categorias WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo}`;
        } else {
            const categoria = results.rows[0];
            return new Categoria(categoria.codigo, categoria.nome, categoria.descricao);
        }
    } catch (err) {
        throw "Erro ao recuperar a categoria: " + err;
    }
}

module.exports = {
    getCategoriasDB, addCategoriaDB, updateCategoriaDB, deleteCategoriaDB, getCategoriaPorCodigoDB
}
