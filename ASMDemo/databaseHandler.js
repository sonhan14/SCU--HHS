const {MongoClient,ObjectId} = require('mongodb')

const DATABASE_URL = 'mongodb+srv://sonhan14:trinhquocanh011@cluster0.dhmh6.mongodb.net/test'
const DATABASE_NAME = 'HanSon-Store'

async function insertToDB(obj,collectionName){ 
    const dbo = await getdbo();
    const result = await dbo.collection(collectionName).insertOne(obj)
    console.log("gia tri id moi duoc insert la:",result.insertedId.toHexString());
}

async function getAll(collectionName){
    const dbo = await getdbo();
    const result = await dbo.collection(collectionName).find({}).toArray()
    return result
}

async function deleteDocumentById(collectionName, id) {
    const dbo = await getdbo();
    await dbo.collection(collectionName).deleteOne({ _id: ObjectId(id) })
}

async function getDocumentById(id,collectionName){
    const dbo = await getdbo();
    const result = await dbo.collection(collectionName).findOne({_id:ObjectId(id)})
    return result;
}

async function updateDocument(id,updateValues,collectionName){
    const dbo = await getdbo();
    await dbo.collection(collectionName).updateOne({_id:ObjectId(id)},updateValues)
}

module.exports = {insertToDB, getAll, deleteDocumentById, getDocumentById, updateDocument}

async function getdbo() {
    const client = await MongoClient.connect(DATABASE_URL);
    const dbo = client.db(DATABASE_NAME);
    return dbo;
}