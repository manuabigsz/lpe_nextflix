const { pool } = require('../config');
const Favorito = require('../entities/Favorito');

const getFavoritosPorUsuarioDB = async (usuario_id) => {
    try {
        const { rows } = await pool.query(
            `SELECT * FROM favoritos WHERE usuario_id = $1 ORDER BY data_adicao DESC`,
            [usuario_id]
        );
        return rows.map(
            (f) => new Favorito(f.id, f.usuario_id, f.video_id, f.data_adicao)
        );
    } catch (err) {
        throw "Erro ao recuperar favoritos: " + err;
    }
};

const addFavoritoDB = async ({ usuario_id, video_id }) => {
    try {
        const result = await pool.query(
            `INSERT INTO favoritos (usuario_id, video_id) VALUES ($1, $2) RETURNING *`,
            [usuario_id, video_id]
        );
        const f = result.rows[0];
        return new Favorito(f.id, f.usuario_id, f.video_id, f.data_adicao);
    } catch (err) {
        if (err.code === '23505') {
            throw "Esse vídeo já está nos seus favoritos.";
        }
        throw "Erro ao adicionar favorito: " + err;
    }
};

const deleteFavoritoDB = async ({ usuario_id, video_id }) => {
    try {
        const result = await pool.query(
            `DELETE FROM favoritos WHERE usuario_id = $1 AND video_id = $2`,
            [usuario_id, video_id]
        );
        if (result.rowCount === 0) {
            throw "Favorito não encontrado.";
        }
        return "Favorito removido com sucesso!";
    } catch (err) {
        throw "Erro ao remover favorito: " + err;
    }
};

const isFavoritoDB = async ({ usuario_id, video_id }) => {
    try {
        const result = await pool.query(
            `SELECT 1 FROM favoritos WHERE usuario_id = $1 AND video_id = $2`,
            [usuario_id, video_id]
        );
        return result.rowCount > 0;
    } catch (err) {
        throw "Erro ao verificar favorito: " + err;
    }
};

module.exports = {
    getFavoritosPorUsuarioDB,
    addFavoritoDB,
    deleteFavoritoDB,
    isFavoritoDB,
};
