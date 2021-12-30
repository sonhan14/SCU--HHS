const {MongoClient,ObjectId} = require('mongodb')
const DATABASE_URL = 'mongodb+srv://sonhan14:trinhquocanh011@cluster0.dhmh6.mongodb.net/test'
const DATABASE_NAME = 'GCH0901_DB'
async function getDatabase() {
    const client = await MongoClient.connect(DATABASE_URL)
    const dbo = client.db(DATABASE_NAME)
    return dbo
}

module.exports = {getDatabase}