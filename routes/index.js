const dotenv = require('dotenv');dotenv.config()
const nano = require('nano')(`http://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}:${process.env.DB_PORT}`);
const db = nano.use(process.env.DB_NAME)
const open_db = () => {

  const db_name = nano.db.list()
  if(db_name.includes(process.env.DB_NAME)){
   return db = nano.use(process.env.DB_NAME)
   //return  console.log('db existe')
    }
     nano.db.create(process.env.DB_NAME);
    return db = nano.use(process.env.DB_NAME)
   //return  console.log('db nao existe')

}
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
