//importação e configuração do banco de dados
const dotenv = require('dotenv');dotenv.config()

const nanodb = require('nano')(`${process.env.DATABASE_URL}:${process.env.DATABASE_PORT}`);
const db = nanodb.use('equipamentos');

// Immportação de model

const express = require('express');
// const Equipamento = require('../model/equip');
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
//  const data = new Equipamento(req.query.chapa,req.query.descricao,req.query.setor,req.query.valor)
    db.insert(req.query, req.query.id, (error) => {
      if(error){return res.send(error.message)}

      res.status(201).send('CREATED')
  
    })
})

//edição
router.put('/:id/edit', (req,res) => {
  db.get(req.params.id, (error,body,headers) => {
    if(error){return res.send(error.message)}
    db.insert({ _rev: body._rev, _id: req.params.id,...req.query}, (error,body,headers) => {
      if(error){return res.send(error.message)}
      res.status(202).send('UPDATED')
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
