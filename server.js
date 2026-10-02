const express = require('express');  

const app = express();              
const PORT = 3000;
app . use( express . json () ) ;



const articles = [
  { id: 1, title: 'welcome to the blog', author: 'Admin' },
  { id: 2, title: 'My first Express server', author: 'Aya' },
  { id: 3, title: 'Testing an API with Postman', author: 'Aya' }
];

// GET /api/articles -> tous les articles
app.get('/api/articles', (req, res)=>{
  res.json({total: articles.length, articles});
})

// GET /api/articles?author=Aya -> seulement ceux d'Aya
app.get('/api/articles', (req, res) => {
  const { author } = req.query;   
  let resultat = articles;
  if (author) {                   
    resultat = articles.filter(a => a.author === author);
  }
  res.json({ total: resultat.length, articles: resultat });
});

// GET /api/articles/2 -> l'article dont l'id vaut 2
app.get('/api/articles/:id', (req, res) => {
  const id = Number(req.params.id);          
  const article = articles.find(a => a.id === id);

  if (!article) {
    return res.status(404).json({ error: `Article ${id} introuvable` });
  }
  res.json(article);
});

app.get('/', (req, res) => {
  res.json({ message: "Hello, I am the blog API" });
});


//creating an Article
let nextId = 4;

app.post('/api/articles', (req,res)=>{

  const {title , author} =req.body;

  if(!title||!author){
    return res.status(400).json({error : "title & author required"});
  }

  const newArticle = { id: nextId, title, author };
  nextId++;
  articles.push(newArticle);
  res.status(201).json({ message:'Article created', article: newArticle });

})



//================================================================
                    //Exercice 1 :
//================================================================

//1. ★ GET /about

app.get('/about', (req , res)=>{
 res.json({
    application: 'Blog API',
    student: 'Manar El Fakih Romdhane',
    version: '1.0.0'
  });
})

//2. ★ GET /api/users
const users = [
  { id: 1, name: "Mariem", email: "mariem@gmail.com" },
  { id: 2, name: "Malek", email: "malek@gmail.com" },
  { id: 3, name: "Asma", email: "asma@gmail.com" }
];

app.get('/api/users', (req , res)=>{
  res.json({total: users.length, users});
})

//3. ★★ GET /api/users/:id

app.get('/api/users/:id' , (req, res)=>{
  const id =Number(req.params.id);
  const user = users.find(u => u.id === id);
  if(!user){
    return res.status(404).json({error: `User ${id} not found`});
  }
  res.json(user);
})

//4. ★★ POST /contact
app.post('/contact', (req , res)=>{
  const {email , message} = req.body;
  if(!email || !message){
    return res.status(400).json({error: "email & message required"});
  }
  res.status(201).json({ message: "Thank you, your message has been received" });
});


//5. ★★★ Bonus: GET /api/users?name=mariem
app.get('/api/users', (req, res) => {
  const { name } = req.query;
  let resultat = users;
  if (name) {
    resultat = users.filter(u => u.name === name);
  }
  res.json({ total: resultat.length, users: resultat });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});