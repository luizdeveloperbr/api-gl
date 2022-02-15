//inicializão do banco de dados ( CouchDB )
const dotenv = require('dotenv');dotenv.config()
const nano = require('nano')(`http://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}:${process.env.DB_PORT}`);

const openDb = async (createDbName) => {
	const dbName = await nano.db.list()
	if (!dbName.includes(createDbName)) {
	 nano.db.create(createDbName)
	 console.log('Database criado com o nome: '+createDbName)
	 return
	}else{
	console.log('Database já existe')
	return
	}
}
openDb('equipamentos')
const db = nano.use('equipamentos')

openDb('loja')
const lj = nano.use('loja')

module.exports = {db,lj}