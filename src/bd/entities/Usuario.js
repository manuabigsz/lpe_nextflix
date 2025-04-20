class Usuario {
    constructor(id, nome, email, plano, data_cadastro) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.plano = plano;
        this.data_cadastro = data_cadastro;
    }
}

module.exports = Usuario;
