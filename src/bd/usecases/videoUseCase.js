// usecases/video.js
const { pool } = require('../config');
const Video = require('../entities/Video');

const getVideosDB = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM videos ORDER BY titulo');
        return rows.map((video) => new Video(video.id, video.titulo, video.descricao, video.url_video, video.categoria_id, video.duracao, video.capa_video, video.data_upload, video.tipo));
    } catch (err) {
        throw "Erro: " + err;
    }
}

const getVideoPorIdDB = async (id) => {
    try {
        const results = await pool.query('SELECT * FROM videos WHERE id = $1', [id]);
        if (results.rowCount === 0) {
            throw `Nenhum registro encontrado com o ID ${id}`;
        } else {
            const video = results.rows[0];
            return new Video(video.id, video.titulo, video.descricao, video.url_video, video.categoria_id, video.duracao, video.capa_video, video.data_upload, video.tipo);
        }
    } catch (err) {
        throw "Erro ao recuperar o vídeo: " + err;
    }
}

const addVideoDB = async (objeto) => {
    try {
        const { titulo, descricao, url_video, categoria_id, duracao, capa_video, tipo } = objeto;
        const query = `
            INSERT INTO videos (titulo, descricao, url_video, categoria_id, duracao, capa_video, tipo) 
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `;
        const { rows } = await pool.query(query, [titulo, descricao, url_video, categoria_id, duracao, capa_video, tipo]);
        return rows[0].id;  // Retorna o ID gerado do vídeo
    } catch (err) {
        throw "Erro ao inserir o vídeo: " + err;
    }
}

const updateVideoDB = async (objeto) => {
    try {
        const { id, titulo, descricao, url_video, categoria_id, duracao, capa_video, tipo } = objeto;
        const query = `
            UPDATE videos
            SET titulo = $2, descricao = $3, url_video = $4, categoria_id = $5, duracao = $6, capa_video = $7, tipo = $8
            WHERE id = $1
        `;
        const results = await pool.query(query, [id, titulo, descricao, url_video, categoria_id, duracao, capa_video, tipo]);
        if (results.rowCount === 0) {
            throw `Nenhum registro encontrado com o ID ${id} para ser alterado`;
        }
    } catch (err) {
        throw "Erro ao alterar o vídeo: " + err;
    }
}

const deleteVideoDB = async (id) => {
    try {
        const results = await pool.query('DELETE FROM videos WHERE id = $1', [id]);
        if (results.rowCount === 0) {
            throw `Nenhum registro encontrado com o ID ${id} para ser removido`;
        } else {
            return `Vídeo de ID ${id} removido com sucesso!`;
        }
    } catch (err) {
        throw "Erro ao remover o vídeo: " + err;
    }
}

module.exports = {
    getVideosDB,
    getVideoPorIdDB,
    addVideoDB,
    updateVideoDB,
    deleteVideoDB
};
