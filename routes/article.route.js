const express = require('express')

const Article = require('../models/article')

const router = express.Router()

// méthode POST
router.post('/', async (req, res) =>  {  
    const nouvarticle = new Article(req.body) 
    try { 
        const response =await nouvarticle.save(); 
        const articles = await Article.findById(response._id).populate("scategorieID").exec(); 
        res.status(200).json({articles, message: "Article enregistrée avec succès"}); 
    } catch (error) { 
        res.status(404).json({ message: error.message }); 
    } 
});

// méthode GET
router.get('/', async (req, res) => {
  // retour tableau
  try {
    const articles = await Article.find({}, null, { sort: { '_id': -1 } }).populate("scategorieID");
    res.status(200).json(articles)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

// méthode DELETE
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    await Article.findByIdAndDelete(id)
    res.json({ message: 'Article supprimée avec succès' })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
  /*try {
    const category = await Categorie.find({"_id": req.params.id});
    res.status(200).Categorie.delete(category);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }*/
})
// méthode FindById

router.get('/:id', async (req, res) => {
  try {
    const cat = await Article.findById(req.params.id)
    res.status(200).json({ cat, message: 'Article trouvée avec succès' })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

// méthode PUT
// modifier une catégorie
router.put('/:articleId', async (req, res) => {
  try {
    const cat1 = await Categorie.findByIdAndUpdate(
      req.params.articleId,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json({ cat1, message: 'Article modifiée avec succès' })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

module.exports = router
