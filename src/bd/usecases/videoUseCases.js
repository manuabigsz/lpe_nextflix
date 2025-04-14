const { pool } = require('../config');
const Video = require('../entities/Video');

const getVideosDB = async () => {
    try {
        const { rows } = await pool.query(`SELECT * FROM videos ORDER BY titulo`);
        return rows.map((video) =>
            new Video(
                video.id,
                video.titulo,
                video.descricao,
                video.url_video,
                video.categoria_id,
                video.duracao,
                video.data_upload,
                video.tipo,
                video.capa_filme
            )
        );
    } catch (err) {
        throw "Erro ao listar os vídeos: " + err;
    }
};

const getVideoPorIdDB = async (id) => {
    try {
        const { rows, rowCount } = await pool.query(`SELECT * FROM videos WHERE id = $1`, [id]);
        if (rowCount === 0) {
            throw `Nenhum vídeo encontrado com id ${id}`;
        }
        const video = rows[0];
        return new Video(
            video.id,
            video.titulo,
            video.descricao,
            video.url_video,
            video.categoria_id,
            video.duracao,
            video.data_upload,
            video.tipo,
            video.capa_filme
        );
    } catch (err) {
        throw "Erro ao buscar o vídeo: " + err;
    }
};

const addVideoDB = async (objeto) => {
    try {
        const { titulo, descricao, url_video, categoria_id, duracao, tipo, capa_filme } = objeto;
        await pool.query(
            `INSERT INTO videos (id, titulo, descricao, url_video, categoria_id, duracao, data_upload, tipo, capa_filme)
             VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, CURRENT_TIMESTAMP, $6, $7)`,
            [titulo, descricao, url_video, categoria_id, duracao, tipo, capa_filme]
        );
    } catch (err) {
        throw "Erro ao inserir vídeo: " + err;
    }
};

const updateVideoDB = async (objeto) => {
    try {
        const { id, titulo, descricao, url_video, categoria_id, duracao, tipo, capa_filme } = objeto;
        const result = await pool.query(
            `UPDATE videos SET 
                titulo = $2, 
                descricao = $3, 
                url_video = $4, 
                categoria_id = $5,
                duracao = $6, 
                tipo = $7, 
                capa_filme = $8
             WHERE id = $1`,
            [id, titulo, descricao, url_video, categoria_id, duracao, tipo, capa_filme]
        );

        if (result.rowCount === 0) {
            throw `Nenhum vídeo encontrado com id ${id} para ser atualizado.`;
        }
    } catch (err) {
        throw "Erro ao atualizar vídeo: " + err;
    }
};

const deleteVideoDB = async (id) => {
    try {
        const result = await pool.query(`DELETE FROM videos WHERE id = $1`, [id]);
        if (result.rowCount === 0) {
            throw `Nenhum vídeo encontrado com id ${id} para ser removido.`;
        } else {
            return `Vídeo com id ${id} removido com sucesso!`;
        }
    } catch (err) {
        throw "Erro ao deletar vídeo: " + err;
    }
};

module.exports = {
    getVideosDB,
    getVideoPorIdDB,
    addVideoDB,
    updateVideoDB,
    deleteVideoDB
};
