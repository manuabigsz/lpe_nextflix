class Video {
    constructor(id, titulo, descricao, url_video, categoria_id, duracao, capa_video, data_upload, tipo) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.url_video = url_video;
        this.categoria_id = categoria_id;
        this.duracao = duracao;
        this.capa_video = capa_video;
        this.data_upload = data_upload;
        this.tipo = tipo;
    }
}

module.exports = Video;
