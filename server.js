const express = require('express');  
const articleRoutes = require ('./routes/articleRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();              
const PORT = 3000;
app.use( express . json () ) ;


app.use('/api/articles', articleRoutes) ;
app.use('/api/users', userRoutes);

app.get('/', (req , res) => {
  res.json ({ message : " API du Blog - Serveur Modulaire Opé rationnel ( SoC)" }) ;
}) ;


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});