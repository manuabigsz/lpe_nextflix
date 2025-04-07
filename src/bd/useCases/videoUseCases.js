const { pool } = require('../config');
const Video = require('../entities/Video');

const getVideosDB = async () => {
    try {
        const { rows } = await pool.query(`SELECT * FROM videos ORDER BY titulo`);
        return rows.map((video) => new Video(video.id, video.titulo, video.descricao, video.url_video, video.categoria_id, video.duracao, video.data_upload));
    } catch (err) {
        throw "Erro: " + err;
    }
}

const getVideoPorIdDB = async (id) => {
    try {
        const results = await pool.query(`SELECT * FROM videos WHERE id = $1`, [id]);
        if (results.rowCount == 0) {
            throw `Nenhum vídeo encontrado com o ID ${id}`;
        } else {
            const video = results.rows[0];
            return new Video(video.id, video.titulo, video.descricao, video.url_video, video.categoria_id, video.duracao, video.data_upload);
        }
    } catch (err) {
        throw "Erro ao recuperar o vídeo: " + err;
    }
}

const addVideoDB = async (objeto) => {
    try {
        const { titulo, descricao, url_video, categoria_id, duracao } = objeto;
        await pool.query(`INSERT INTO videos (titulo, descricao, url_video, categoria_id, duracao) VALUES ($1, $2, $3, $4, $5)`, [titulo, descricao, url_video, categoria_id, duracao]);        
    } catch (err) {
        throw "Erro ao inserir o vídeo: " + err;
    }
}

const updateVideoDB = async (objeto) => {
    try {
        const { id, titulo, descricao, url_video, categoria_id, duracao } = objeto;        
        const results = await pool.query(`UPDATE videos SET titulo = $2, descricao = $3, url_video = $4, categoria_id = $5, duracao = $6 WHERE id = $1`, [id, titulo, descricao, url_video, categoria_id, duracao]);
        if (results.rowCount == 0) {
            throw `Nenhum vídeo encontrado com o ID ${id} para ser alterado`;
        }
    } catch (err) {
        throw "Erro ao alterar o vídeo: " + err;
    }
}

const deleteVideoDB = async (id) => {
    try {
        const results = await pool.query(`DELETE FROM videos WHERE id = $1`, [id]);
        if (results.rowCount == 0) {
            throw `Nenhum vídeo encontrado com o ID ${id} para ser removido`;
        } else {
            return `Vídeo de ID ${id} removido com sucesso!`;
        }
    } catch (err) {
        throw "Erro ao remover o vídeo: " + err;
    }
}

module.exports = {
    getVideosDB, getVideoPorIdDB, addVideoDB, updateVideoDB, deleteVideoDB
}
