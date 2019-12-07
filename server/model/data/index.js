const Data = require('./data')

module.exports = {
  async findData(query = {}) {
    const data = await Data.find(query)
    return data
  },
  async createData(id,message) {
    const data = await Data.create({
      id,
      message
    })
    return data
  }
}