const express = require('express')
const app = express()

app.get('/', (req,res) =>{
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>Hello World</h1>')
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log('Server is running!!!!!')