const express = require('express')
const app = express()

app.use(express.static('public'))

app.set('view engine', 'hbs')
app.use(express.urlencoded({extended:true}))

app.post('/intro',(req,res)=>{
    const name = req.body.txtName
    const age = req.body.txtAge
    res.render('profile', {name:name,age:age})
})

app.get('/', (req,res)=>{
    const name = "Hong Son"
    const homNay = new Date().toLocaleDateString("vi-VN")
    res.render('home', {userName:name, date:homNay})
})

app.get('/intro',(req,res)=>{
    res.render('enterInfo')
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log('Server is running', PORT)
