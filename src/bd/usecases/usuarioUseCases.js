const { pool } = require('../config');
const Usuario = require('../entities/Usuario');

const autenticaUsuarioDB = async (objeto) => {
    try {
        const { email, senha } = objeto;
        console.log('Email: ' + email + " Senha: " + senha);

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

        console.log('[DB] Iniciando cadastro no banco de dados:', objeto);

        const results = await pool.query(
            `INSERT INTO usuarios (nome, email, senha, plano, data_cadastro)
             VALUES ($1, $2, $3, $4, NOW())
             RETURNING *`,
            [nome, email, senha, plano]
        );

        const usuario = results.rows[0];
        console.log('[DB] Cadastro concluído:', usuario);

        return new Usuario(
            usuario.id,
            usuario.nome,
            usuario.email,
            usuario.plano,
            usuario.data_cadastro
        );
    } catch (err) {
        console.error('[DB] Erro no cadastro:', err);
        throw "Erro ao cadastrar o usuário: " + err;
    }
};


module.exports = { autenticaUsuarioDB, cadastraUsuarioDB };
