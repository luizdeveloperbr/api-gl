class Equipamento {
    constructor(args = {}){
      this._id = args.id;
      this.descricao = args.descricao;
      this.setor = args.setor;
      this.valor = args.valor
    }
    add(){
      return {
      _id: this._id,
      descricao: this.descricao || 'descrição',
      setor: this.setor || 'setor',
      valor: this.valor || '0'
    }
    };
    edit(argsEdit = {}){
      return {
        descricao: this.descricao || argsEdit.descricao,
        setor:this.setor || argsEdit.setor,
        valor: this.valor || argsEdit.valor
      }
    }
}
module.exports = Equipamento