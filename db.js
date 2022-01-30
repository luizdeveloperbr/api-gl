const dotenv = require('dotenv'); dotenv.config()
const nano = require('nano')(`http://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}:${process.env.DB_PORT}`);
const openDb = async () => {
	const dbName = await nano.db.list()
	console.log(dbName)
	if (!db_name.includes(process.env.DB_NAME)) {
	 nano.db.create(process.env.DB_NAME)
	}
	return process.env.DB_NAME
}
module.exports = openDb