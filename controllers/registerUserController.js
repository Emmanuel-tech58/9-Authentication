const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const userDB = {
    users: require('../model/users.json'),
    setUsers: function (data){this.users = data}
}

const handleNewUser = async (req, res) => {
    const {user, pdw} = req.body;

    //check if user and password were received
    if(!user || !pdw) return res.status(400).json({'message': 'user name and password are required'});
    //check for duplicate user
    const duplicate = userDB.users.find(person => person.username === user);
    console.log(duplicate);
    if(duplicate) return res.sendStatus(409);

    try{
        //encrypt password
        const hashedPdw = await bcrypt.hash(pdw, 10);
        //create new user
        const newUser = {"username": user, "password": hashedPdw};

        userDB.setUsers([...userDB.users, newUser])

        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(userDB.users)
        );
        //console.log(userDB.users);
        res.status(201).json({'success': `new user ${user} created!`});
    } catch(err){
        res.status(500).json({'message': err.message});
    }
}

module.exports = {handleNewUser};