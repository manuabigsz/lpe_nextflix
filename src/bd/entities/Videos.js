class Video {
    constructor(codigo, titulo, descricao, url_video,duracao,data_upload, tipo_video){
        this.codigo = codigo;
        this.titulo = titulo;
        this.descricao = descricao;
        this.url_video = url_video;
        this.duracao = duracao;
        this.data_upload = data_upload;
        this.tipo_video = tipo_video;
    }
}

module.exports = Video;