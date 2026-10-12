const express=require('express');
const router=express.Router();
const articleController =require('../controllers/articleController')

router.get('/', articleController.getAllArticles);
router .get('/:id', articleController.GetArticleById ) ;
router .get ('/', articleController .GetArticleByauthor )
router .post ('/', articleController .GetArticleByauthor ) ;
router.put('/:id' , articleController.updateArticle);
router.delete('/:id', articleController.deleteArticle);

module .exports = router ;