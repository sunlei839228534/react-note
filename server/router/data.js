const Router = require('koa-router')
const router = new Router()
const { HttpException , Success } = require('../middlewares/http-exception')
const { findAllData, findData , createData , deleteData , updateData } = require('../model/data')

router.get('/getData', async (ctx,next) => {
  const data = await findAllData()
  throw new Success({
    success: "true",
    data
  })
})

router.post('/updateData', async (ctx,next) => {
  const { id, message } = ctx.request.body
  if(!id) {
    throw new HttpException('请传入id', 10000, 401)
  }
  const result = await findData({id})
  console.log(result)
  if(result == undefined) {
    throw new HttpException('请输入正确的id', 10000, 401)
  } else {
    const update = Object.assign(result, {
      message
    })
    await updateData(id, update)
    throw new Success({
      success: "true",
      update
    })
  }
})

router.post('/pushData', async(ctx,next) => {
  const {id,message} = ctx.request.body
  const result = await findData({id})
  if(result || !id) {
    throw new HttpException('id已存在,或者未提交id',10000,400)
  }else {
    const data = await createData(id,message)
    throw new Success({
      success: "true",
      data
    }, 100001)
  }
})

router.delete('/deleteData', async(ctx,next) => {
  const { id } = ctx.request.body
  console.log(id)
  if(!id) {
    throw new HttpException('请输入id', 10000, 400)
  }
  const result = await findData({id})
  if(!result) {
    throw new HttpException('请输入正确的id', 10000, 401)
  } else {
    await deleteData(id)
      throw new Success('删除成功!',100001)
  }
})


module.exports = router