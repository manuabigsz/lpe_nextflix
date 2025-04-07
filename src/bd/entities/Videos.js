class Video {
    constructor(id, titulo, descricao, url_video, categoria_id, duracao, data_upload, tipo, capa_filme) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.url_video = url_video;
        this.categoria_id = categoria_id;
        this.duracao = duracao;
        this.data_upload = data_upload;
        this.tipo = tipo;
        this.capa_filme = capa_filme;
    }
}

module.exports = Video;
