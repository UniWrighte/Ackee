'use strict'

// const Domain = require('../schemas/Domain')
const db = require('../models')

// const add = async (data) => {
//   return Domain.create(data)
// }
const add = async (data) => {
  return db.Domain.create(data)
}

// const all = async () => {
//   return Domain.aggregate([
//     {
//       $addFields: {
//         insensitive: {
//           $toLower: '$title'
//         }
//       }
//     },
//     {
//       $sort: {
//         insensitive: 1
//       }
//     }
//   ])
// }
const all = async () => {
  return db.Domain.findAll()
}

// const get = async (id) => {
//   return Domain.findOne({
//     id
//   })
// }
const get = async id => {
  return db.Domain.findOne({ where: { id } })
}

// const update = async (id, { title }) => {
//   return Domain.findOneAndUpdate({
//     id
//   }, {
//     $set: {
//       title,
//       updated: Date.now()
//     }
//   }, {
//     new: true
//   })
// }

const update = async (id, { title }) => {
  return db.Domain.update({ title }, { where: { id } })
}

// const del = async (id) => {
//   return Domain.findOneAndDelete({
//     id
//   })
// }
const del = async id => {
  return db.Domain.destroy({ where: { id } })
}

module.exports = {
  add,
  all,
  get,
  update,
  del
}
