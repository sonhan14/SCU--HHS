const fs = require('fs')
const express = require('express')
const path = require('path')
const app = express()

app.get('/',(req,res)=>{
    res.statusCode = 200
    res.setHeader('Content-Type','text/html')
    res.write('<h1>Home Page</h1>')
    res.write("<ul><li><a href = '/about'>About</a></li><li>2</li><li>3</li></ul>")
})
app.get('/about',(req,res)=>{
    res.statusCode = 200
    res.setHeader('Content-Type','text/html')
    res.write('<h2>About Page</h2>')
    const data = fs.readFileSync('hello.txt', 'utf-8')
    res.write(data)
    res.end("<ul><li>1</li><li>2</li><li>3</li></ul>")
})

const PORT = process.env.PORT || 5000 
app.listen(PORT)
console.log('Server is running!!!!')