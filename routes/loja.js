const express = require('express');
const router = express.Router()
const {lj} = require('../db');
const Loja = require('../model/loja');

router.get('/:id', (req, res) => {
    lj.get(req.params.id, (error, body) => {
        if (error) { return res.send(error.message) }
        res.status(200).send(body)
    })
})
//criação
router.post('/add',(req,res) => { 
    const data = new Loja(req.query)
    lj.insert(data.add(), data._id, (error) => {
      if(error){return res.send(error.message)}
      res.status(201).send(`${data._id} criado`)
    })
  })
  //edição
  router.put('/:id/edit', (req,res) => {
    lj.get(req.params.id, (error,body,headers) => {
      if(error){return res.send(error.message)}
      const data = new Loja(req.query)
      lj.insert({ _rev: body._rev, _id: req.params.id,...data.edit(body)}, (error,body,headers) => {
        if(error){return res.send(error.message)}
        res.status(202).send(`updated ${body.rev}`)
      })
    })
  })
  //excluir
  router.delete('/:id/delete', (req,res) => {
    lj.get(req.params.id, (error,body,headers) => {
           if(error){return res.send(error.message)}
             lj.destroy(req.params.id, body._rev)
         })
    res.status(200).send(`deleted ${req.params.id}`)
  })
  
module.exports = router