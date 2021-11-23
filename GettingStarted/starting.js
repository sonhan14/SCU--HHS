const fs = require('fs')

//Arrow style
const baz = ()=> console.log("my name is baz!")
const bar = ()=> console.log("my name is bar!")

const foo = ()=>{
    console.log("my name is foo2! ")
    setTimeout(bar,0)
    new Promise((resolver,reject)=>{
        //dosomething> vd la success thi goi resolver
        //resolver("Sucess execution!")
        reject("connection failed!")
    }).then(result=>console.log("Congrats!"+result))
    .catch(error=>console.log("Sorry!" + error))
    baz()
}

foo()

//console.log("1")
//setTimeout(()=>{console.log("2")},3000)
//setTimeout(baz,0)
//console.log("2")
//console.log("3")



// fs.readFile('hello.txt', 'utf-8', (error, data) =>{
//     if(error){
//         console.log('Da co loi!' + error)
//     }else {
//         console.log("Read file successfully!")
//         console.log(data)
//     }
// })

// const port = 5000
// const readHelloWorld = (error, data) =>{
//   if(error){
//       console.log('Da co loi!' + error)
//   }else {
//       console.log("Read file successfully!")
//       console.log(data)
//   }
// }

// fs.readFile('hello.txt', 'utf-8'. readHelloWorld)

//Synchronous way
const data = fs.readFileSync('hello.txt', 'utf-8')
console.log(data)