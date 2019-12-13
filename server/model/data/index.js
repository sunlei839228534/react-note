const Data = require('./data')

module.exports = {
  async findAllData () {
    const data = await Data.find({})
    return data
  },
  async findData (query = {}) {
    const data = await Data.findOne(query)
    return data
  },
  async createData (id,message) {
    const data = await Data.create({
      id,
      message
    })
    return data
  },
  async deleteData (id) {
    const result = await Data.findOneAndDelete({ id } )
    return result
  },
  async updateData (id, update) {
    await Data.findOneAndUpdate({ id }, update , {new: false})
  }
}