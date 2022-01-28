const dotenv = require('dotenv'); dotenv.config()
const nano = require('nano')(`http://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}:${process.env.DB_PORT}`);
let openDb
async () => {
	const db_name = await nano.db.list()
	console.log(db_name)
	if (db_name.includes(process.env.DB_NAME)) {
	openDb = nano.use(process.env.DB_NAME)
	}else{
		nano.db.create(process.env.DB_NAME);
	}
	openDb = nano.use(process.env.DB_NAME)
}
module.exports = openDb