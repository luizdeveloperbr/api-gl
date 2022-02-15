class Loja {
    constructor(arg = {}){
        this._id = arg.numero;
        this.descricao = arg.descricao
    }
    add(){
        return{
            _id:this._id,
            descricao: this.descricao || 'descricao'
        }
    }
    edit(argsEdit = {}){
        return{
            descricao: this.descricao || argsEdit.descricao
        }
    }
}
module.exports = Loja