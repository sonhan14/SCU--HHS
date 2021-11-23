const bar = () => console.log('bar')

const baz = () => console.log('baz')

const foo = () => {
  console.log('foo')
  setTimeout(bar, 0)
  new Promise((resolve, reject) =>{
    resolve('Success execution!')
  }).then(resolve => console.log(resolve))
  .catch(error => console.log('Sorry!' + error))
  baz()
}

foo()