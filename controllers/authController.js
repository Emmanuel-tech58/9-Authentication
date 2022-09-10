const path = require('path');
const bcrypt = require('bcrypt');

const userDB = {
    users: require('../model/users.json'),
    setUsers: function (data){this.users = data}
}

const handleLogin = async(req, res) => {
    const {user, pdw} = req.body;
    //check if user and password were received
    if(!user || !pdw) return res.status(400).json({'message': 'user name and password are required'});
    const foundUser = userDB.users.find(person => person.username === user);
    if(!foundUser) return res.sendStatus(401);
    //evaluate password
    const passwordMatch = await bcrypt.compare(pdw, foundUser.password);
    if(passwordMatch){
        //Create JWT
        res.json({'message': `user ${user} is logged in`});
    }else{
        res.sendStatus(401);
    }
}

module.exports = {handleLogin};