//importação e configuração do banco de dados
const nanodb = require('nano')('http://localhost:5984');
const db = nanodb.use('equipamentos');

const express = require('express')
const router = express.Router()

//visualização

  router.get('/:id', (req,res) => {
       db.get(req.params.id, (error,body,headers) => {
         if(error){return res.send(error.message)}
         res.send(body)
       })

  })

//criação
router.post('/add', async (req,res) => { 
    db.insert({_id:req.query.id,descricao:req.query.desc}, (error,body,headers) => {
      if(error){return res.send(error.message)}
      res.send('dados inseridos com sucesso')
    })
})

//edição
router.put('/:id/edit', (req,res) => {
  var doc
  db.get(req.params.id, (error,body,headers) => {
    if(error){return res.send(error.message)}
    doc = body
    console.log(doc)
  })
  db.insert({...doc,...req.query})
  res.send('updated')
})
/*
//delete
router.delete('/:id/delete', () => {

})
*/
module.exports = router
