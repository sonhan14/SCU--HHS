
const express = require('express')
const { insertToDB, getAll, deleteDocumentById, getDocumentById, updateDocument, } = require('./databaseHandler')
const { render, redirect } = require('express/lib/response')
const async = require('hbs/lib/async')
const app = express()


app.set('view engine', 'hbs')
app.use(express.static("public"))
app.use(express.urlencoded({ extended : true}))

app.get('/product',(req,res)=>{
    res.render('product')
})

app.get('/',async(req,res)=>{
    var result = await getAll("Products")
    res.render('index',{products:result})
})


app.post('/product',async (req,res)=>{
    const nameInput = req.body.txtName
    const priceInput = req.body.txtPrice
    const picURL = req.body.txtPicURL
    // if(nameInput.startsWith('LEGO') == false)
    // {
    //     const errorNameMessage = "Name must be start with 'LEGO'"
    //     const oldP = {name:nameInput,price:priceInput,pic:picURL}
    //     res.render('product',{errorName:errorNameMessage,oldP:oldP})
    //     return;
    // }
    if(nameInput.substring(0,3) != 'LEGO')
    {
        const errorNameMessage = "Name must be start with 'LEGO'"
        const oldP = {name:nameInput,price:priceInput,pic:picURL}
        res.render('product',{errorName:errorNameMessage,oldP:oldP})
        return;
    }
    // if(nameInput.length >= 5)
    // {
    //     const errorNameMessage = "Name lenght must be < 5"
    //     const oldP = {name:nameInput,price:priceInput,pic:picURL}
    //     res.render('product',{errorName:errorNameMessage,oldP:oldP})
    //     return;
    // }
    if(isNaN(priceInput)==true){
        const errorPriceMessage = "Price must be number"
        const oldP = {name:nameInput,price:priceInput,pic:picURL}
        res.render('product',{errorPrice:errorPriceMessage,oldP:oldP})
        return;
    }
    const newP = {name:nameInput,price:Number.parseFloat(priceInput),pic:picURL}
    await insertToDB(newP,"Products")
    res.redirect('/product')
})

app.get('/delete',async(req,res)=>{
    const id = req.query.id
    const price = req.body.txtPriceTable
    if(price > 100000)
    {
        const errorDelete = "Only product < 100k can be deleted"
        res.render('index',{errorDelete:errorDelete})
        return;
    }
    console.log("id need delete: " + id)
    await deleteDocumentById("Products", id)
    res.redirect('/')
})

app.get('/edit',async(req,res)=>{
    const id = req.query.id
    const result = await getDocumentById(id,"Products")
    res.render('edit', {product:result})
})

app.post('/edit',async (req,res)=>{
    const nameInput = req.body.txtName
    const priceInput = req.body.txtPrice
    const picURL = req.body.txtPicURL
    const id = req.body.txtId
    if(isNaN(priceInput)==true){
        const errorMessage = "Price must be number"
        const result = await getDocumentById(id,"Products")
        res.render('edit',{error:errorMessage, product:result})
        return;
    }
    const updateValues = {$set : {name:nameInput, price:priceInput, pic:picURL}}
    await updateDocument(id, updateValues,"Products")
    res.redirect('/')
})



const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log('Server is running!!!')

async function getDatabase() {
    const client = await MongoClient.connect(DATABASE_URL)
    const dbo = client.db(DATABASE_NAME)
    return dbo
}
