// on commence de créer que n'ont pas une relation avec la classe
const mongoose = require('mongoose')

const categorieSchema = mongoose.Schema({
  nomcategorie: { type: String, required: true, unique: true },
  imagecategorie: { type: String, required: false }
})

module.exports = mongoose.model('Categorie', categorieSchema)
