const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const mongoose = require('mongoose')
const cors = require('@koa/cors')

const catchError = require('./server/middlewares/exception')
const Data = require('./server/router/data')

const app = new Koa()

mongoose.connect('mongodb://127.0.0.1:27017/note',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

let db = mongoose.connection

db.once('open', () => console.log("connected to the database"))
db.on('error', console.error.bind(console, "MongoDB connection error"))
//数据库连接操作

app.use(cors())
app.use(catchError)
app.use(bodyparser({
})) //post请求数据获取


app.use(Data.routes(),Data.allowedMethods())


app.listen(8000,() => {
  console.log('server is running in 8000')  
})