const { pool } = require('../config');
const Usuario = require('../entities/Usuario');

const autenticaUsuarioDB = async (objeto) => {
    try {
        const { email, senha } = objeto;

        const results = await pool.query(
            `SELECT * FROM usuarios WHERE email = $1 AND senha = $2`,
            [email, senha]
        );

        if (results.rowCount === 0) {
            throw "Usuário ou senha inválidos";
        }

        const usuario = results.rows[0];
        return new Usuario(
            usuario.id,
            usuario.nome,
            usuario.email,
            usuario.plano,
            usuario.data_cadastro
        );
    } catch (err) {
        throw "Erro ao autenticar o usuário: " + err;
    }
};
const cadastraUsuarioDB = async (objeto) => {
    try {
        const { nome, email, senha, plano } = objeto;


        const results = await pool.query(
            `INSERT INTO usuarios (nome, email, senha, plano, data_cadastro)
             VALUES ($1, $2, $3, $4, NOW())
             RETURNING *`,
            [nome, email, senha, plano]
        );

        const usuario = results.rows[0];

        return new Usuario(
            usuario.id,
            usuario.nome,
            usuario.email,
            usuario.plano,
            usuario.data_cadastro
        );
    } catch (err) {
        throw "Erro ao cadastrar o usuário: " + err;
    }
};

const updateUsuarioDB = async (objeto) => {
    try {
        const { email, nome, senha, plano } = objeto;

        const query = senha
            ? `UPDATE usuarios SET nome = $1, senha = $2, plano = $3 WHERE email = $4 RETURNING *`
            : `UPDATE usuarios SET nome = $1, plano = $2 WHERE email = $3 RETURNING *`;

        const values = senha
            ? [nome, senha, plano, email]
            : [nome, plano, email];

        const results = await pool.query(query, values);


        if (results.rowCount === 0) {
            throw 'Usuário não encontrado para atualização';
        }

        const usuario = results.rows[0];
        return new Usuario(
            usuario.id,
            usuario.nome,
            usuario.email,
            usuario.plano,
            usuario.data_cadastro
        );
    } catch (err) {
        console.error('[DB] Erro ao atualizar usuário:', err);
        throw 'Erro ao atualizar o usuário: ' + err;
    }
};

module.exports = { autenticaUsuarioDB, cadastraUsuarioDB, updateUsuarioDB };

