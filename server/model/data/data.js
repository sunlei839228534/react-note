const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DataSchema = new Schema (
  {
    id: {
      type: Number
    },
    temp: {
      type: String
    },
    message: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Data',DataSchema)