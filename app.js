const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const mongoose = require('mongoose')
const Router = require('koa-router')
const { findData,createData } = require('./server/model/data')

const app = new Koa()
const router = new Router()

app.use(bodyparser()) //post请求数据获取

mongoose.connect('mongodb://127.0.0.1:27017/note',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

let db = mongoose.connection

db.once('open', () => console.log("connected to the database"))
db.on('error', console.error.bind(console, "MongoDB connection error"))
//数据库连接操作

router.get('/getData', async (ctx,next) => {
  const data = await findData()
  ctx.body = {
    data
  }
})

router.post('/pushData', async(ctx,next) => {
  const {id,message} = ctx.request.body
  const result = await findData({id})
  if(result.length !== 0 || !id) {
    ctx.body = {
      success: "false",
      id: result.id,
      message: `id${result[0].id} 已经存在,无法创建`
    }
  }else {
    const data = await createData(id,message)
    ctx.body = {
      success: "true",
      id: data.id,
      message: data.message
    }
  }
})

app.use(router.routes(),router.allowedMethods())


app.listen(8000,() => {
  console.log('server is running in 8000')  
})