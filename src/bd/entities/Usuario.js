class Usuario {
    constructor(email, tipo, telefone, nome,data_cadastro,plano){
        this.email = email;
        this.tipo = tipo;
        this.telefone = telefone;
        this.nome = nome;
        this.data_cadastro = data_cadastro;
        this.plano = plano;
    }
}

module.exports = Usuario;