const { pool } = require('../config');
const Favorito = require('../entities/Favorito');

const getFavoritosDB = async () => {
    try {
        const { rows } = await pool.query(`SELECT * FROM favoritos ORDER BY data_adicao`);
        return rows.map((favorito) => new Favorito(favorito.id, favorito.usuario_id, favorito.video_id, favorito.data_adicao));
    } catch (err) {
        throw "Erro: " + err;
    }
}

const addFavoritoDB = async (objeto) => {
    try {
        const { usuario_id, video_id } = objeto;
        await pool.query(`INSERT INTO favoritos (usuario_id, video_id) VALUES ($1, $2)`, [usuario_id, video_id]);        
    } catch (err) {
        throw "Erro ao adicionar favorito: " + err;
    }
}

const deleteFavoritoDB = async (id) => {
    try {
        const results = await pool.query(`DELETE FROM favoritos WHERE id = $1`, [id]);
        if (results.rowCount == 0) {
            throw `Nenhum favorito encontrado com o ID ${id} para ser removido`;
        } else {
            return `Favorito de ID ${id} removido com sucesso!`;
        }
    } catch (err) {
        throw "Erro ao remover o favorito: " + err;
    }
}

const getFavoritosPorUsuarioDB = async (usuario_id) => {
    try {
        const { rows } = await pool.query(`SELECT * FROM favoritos WHERE usuario_id = $1`, [usuario_id]);
        return rows.map((favorito) => new Favorito(favorito.id, favorito.usuario_id, favorito.video_id, favorito.data_adicao));
    } catch (err) {
        throw "Erro ao recuperar os favoritos: " + err;
    }
}

module.exports = {
    getFavoritosDB, addFavoritoDB, deleteFavoritoDB, getFavoritosPorUsuarioDB
}
