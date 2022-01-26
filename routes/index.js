//importação e configuração do banco de dados
const md5 = require('object-hash')
const nanodb = require('nano')('http://localhost:5984');
const db = nanodb.use('equipamentos');

const express = require('express')
const router = express.Router()

//visualização 

  router.get('/:id', (req,res) => {
       db.get(req.params.id, (error,body,headers) => {
         if(error){return res.send(error.message)}
         res.status(200).send(body)
       })
  })

//criação
router.post('/add',(req,res) => { 
 // let _id, desc = req.query

    db.insert(req.query, (error,body,headers) => {
      if(error){return res.send(error.message)}

      res.status(201).send('CREATED')
  
    })
})

//edição
router.put('/:id/edit', (req,res) => {
    //função nova ID de revisão
   function rev(d){
    let n = d._rev[0]
   let hash = md5(req.query, 'hex')
   let resul = String(n+1) + "-" + hash
   console.log(resul)
   return resul
  }
  var doc
  db.get(req.params.id, (error,body,headers) => {
    if(error){return res.send(error.message)}
    doc = body
  })
  db.insert({ _rev: rev(doc), _id: req.params.id,...req.query})
  res.send('updated')
})

//delete
router.delete('/:id/delete', (req,res) => {
  db.get(req.params.id, (error,body,headers) => {
         if(error){return res.send(error.message)}
           db.destroy(req.params.id, body._rev)
       })
  res.send('DELETE')
})

module.exports = router
