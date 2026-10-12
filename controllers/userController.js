let users = [
  { id: 1, name: "Mariem", email: "mariem@gmail.com" },
  { id: 2, name: "Malek", email: "malek@gmail.com" },
  { id: 3, name: "Asma", email: "asma@gmail.com" }
];


//2. ★ GET /api/users
const getAllUsers =(req , res)=>{
      res.json({total: users.length, users});

}


//3. ★★ GET /api/users/:id
const getUserById =(req , res)=>{
   const id =Number(req.params.id);
  const user = users.find(u => u.id === id);
  if(!user){
    return res.status(404).json({error: `User ${id} not found`});
  }
  res.json(user);}




//5. ★★★ Bonus: GET /api/users?name=mariem
const GetUserByName =(req, res)=>{
  const { name } = req.query;
  let resultat = users;
  if (name) {
    resultat = users.filter(u => u.name === name);
  }
  res.json({ total: resultat.length, users: resultat });
}


//create User

const { estNonVide, estEmailValide } = require('../utils/validators');

const createUser =(req, res)=>{
  const {name ,email} = req.body;
  if(!estNonVide(name) || !estEmailValide(email)){
    return res.status(400).json({error: "name & email required / email must contain @ and ."});
  }
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json({ message: "User created", user: newUser });
}


//delete user
const deleteUser =(req, res)=>{
  const id =Number(req.params.id);
  const userExiste = users.some(u=> u.id === id);
  if(!userExiste){
    return res.status(404).json({error : `Impossible de supprimer : user ${id} introuvable`});
  }
  users = users.filter(u=> u.id !== id);
  res.status(200).json({message : "User deleted successfully"});  
}

module.exports = {
    getAllUsers,
    getUserById,
    GetUserByName,
    createUser,
    deleteUser
};


