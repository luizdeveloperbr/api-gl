class Equipamento {
    constructor(args = {}){
      this._id = args.id;
      this.descricao = args.descricao || 'vazio';
      this.setor = args.setor || 'vazio';
      this.valor = args.valor || '0'
    }
    edit(){
      return {descricao: this.descricao,setor:this.setor,valor: this.valor}
    }
}
module.exports = Equipamento