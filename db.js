const dotenv = require('dotenv');dotenv.config()
const nano = require('nano')(`http://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}:${process.env.DB_PORT}`);

const db = async () => {
	const db_name = await nano.db.list()
	if(db_name.includes(process.env.DB_NAME)){
				console.log('db existe')
		return  nano.db.use(process.env.DB_NAME)

		}
		await nano.db.create(process.env.DB_NAME);
				console.log('db nao existe')
		return nano.db.use(process.env.DB_NAME)


}