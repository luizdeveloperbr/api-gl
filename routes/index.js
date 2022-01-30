//inicializão do banco de dados ( CouchDB )
const dotenv = require('dotenv');dotenv.config()
const nano = require('nano')(`http://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}:${process.env.DB_PORT}`);
const db = nano.use(process.env.DB_NAME)

//Express.js para configuração das rotas
const express = require('express');
const router = express.Router()

const Equipamento = require('../model/equip');
//criação
router.post('/add',(req,res) => { 
  const data = new Equipamento(req.query)
  db.insert(data, data._id, (error) => {
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
    db.insert({ _rev: body._rev, _id: req.params.id,...data.edit()}, (error,body,headers) => {
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
  res.status(200).send('DELETE')
})

module.exports = router
