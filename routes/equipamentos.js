
//Express.js para configuração das rotas
const express = require('express');
const router = express.Router()

const {db} = require('../db')
const Equipamento = require('../model/equipamentos');
//criação
router.post('/add',(req,res) => { 
  const data = new Equipamento(req.query)
  db.insert(data.add(), data._id, (error) => {
    if(error){return res.send(error.message)}
    res.status(201).send(`${data._id} criado`)
  })
})

//visualização 
  router.get('/:id', (req,res) => {
       db.get(req.params.id, (error,body,headers) => {
         if(error){return res.send(error.message)}
         res.status(200).send(body)
       })
  })


//edição
router.put('/:id/edit', (req,res) => {
  db.get(req.params.id, (error,body,headers) => {
    if(error){return res.send(error.message)}
    const data = new Equipamento(req.query)
    db.insert({ _rev: body._rev, _id: req.params.id,...data.edit(body)}, (error,body,headers) => {
      if(error){return res.send(error.message)}
      res.status(202).send(`updated ${body.rev}`)
    })
  })
})

//delete
router.delete('/:id/delete', (req,res) => {
  db.get(req.params.id, (error,body,headers) => {
         if(error){return res.send(error.message)}
           db.destroy(req.params.id, body._rev)
       })
  res.status(200).send(`deleted ${req.params.id}`)
})

module.exports = router
