
let articles = [
  { id: 1, title: 'welcome to the blog', author: 'Admin' },
  { id: 2, title: 'My first Express server', author: 'Aya' },
  { id: 3, title: 'Testing an API with Postman', author: 'Aya' }
];

let prochainId = 4 ;
const getAllArticles =(req , res)=>{
    res.json({total: articles.length, articles});

};
const GetArticleByauthor =(req , res)=>{
    const { author } = req.query;   
    let resultat = articles;
    if (author) {                   
        resultat = articles.filter(a => a.author === author);
    }
    res.json({ total: resultat.length, articles: resultat });
};

const GetArticleById = (req , res)=>{
  const id = Number(req.params.id);          
  const article = articles.find(a => a.id === id);

  if (!article) {
    return res.status(404).json({ error: `Article ${id} introuvable` });
  }
  res.json(article);
};


//create new article
const createArticle =(req , res)=>{
  const {title , author} =req.body;

  if(!title||!author){
    return res.status(400).json({error : "title & author required"});
  }

  const newArticle = { id: prochainId, title, author };
  prochainId++;
  articles.push(newArticle);
  res.status(201).json({ message:'Article created', article: newArticle });

};



//Update an article
const updateArticle =(req, res)=>{
  const id =Number(req.params.id);
  const {title , author}=req.body;

  const index =articles.findIndex(a => a.id == id);

  // On recherche l’index de l’article dans le tableau
  if(index === -1){
    return res.status(404).json({error : `Article ${id} introuvable`});

  }

  // Mise à jour partielle ou totale
  if(title) articles[index].title = title;
  if(author) articles[index].author=author;


  res.status(200).json({message : 'Article mis a jour' , article:articles[index]});


}


//delete an article
const deleteArticle =(req , res) =>{
  const id = Number(req.params.id);
  const articleExiste = articles.some(a=> a.id === id);

  if(!articleExiste){
    return res.status(404).json({error : `Impossible de supprimer : article ${id} introuvable`});
  }

  articles = articles.filter(a=> a.id !== id);
  res.status(200).json({message : "Article supprimé avec succès"});

};




module.exports = {
    getAllArticles,
    GetArticleById,
    GetArticleByauthor,
    createArticle,
    updateArticle,
    deleteArticle
};
