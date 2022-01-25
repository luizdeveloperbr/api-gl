//importação e configuração do banco de dados
const nanodb = require('nano')('http://localhost:5984');
const db = nanodb.use('equipamentos');

const express = require('express')
const router = express.Router()

//visualização
router.get('/:id',async (req,res) => {
  const doc = await db.get(req.params.id)
  res.statusCode(200).send(`${doc.descricao}`)
})
//criação
router.post('/add', async (req,res) => {

})

//edição
router.put('/:id/edit', async (req,res) => {

})

//delete
router.delete('/:id/delete', () => {

})

module.exports = router
