const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const mongoose = require('mongoose')
const app = new Koa()

mongoose.connect('mongodb://127.0.0.1:27017/note',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
},() => {
  console.log(`mongoose connect`)
})

app.use(bodyparser())
app.use(async (ctx,next)=> {
  ctx.body = "hello "
})

app.listen(8000,() => {
  console.log('server is running in 8000')  
})