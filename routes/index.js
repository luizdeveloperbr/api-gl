//inicializão do banco de dados ( CouchDB )
const dotenv = require('dotenv');dotenv.config()
const nano = require('nano')(`http://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}:${process.env.DB_PORT}`);

const openDb = async () => {
  const dbName = await nano.db.list()
  if (!dbName.includes(process.env.DB_NAME)) {
   nano.db.create(process.env.DB_NAME)
  }
  return
}
const db = nano.use(process.env.DB_NAME)

//Express.js para configuração das rotas
const express = require('express');
const router = express.Router()

const Equipamento = require('../model/equip');
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
