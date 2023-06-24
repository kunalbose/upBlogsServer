const User = require('../models/User');

async function checkValid(username, email){
    let user1 = null;
    let user2 = null;

    if(username){
        user1 = await User.findOne({username});
    }
    if(email){
        user2 = await User.findOne({email});
    }

    if(user1 || user2){
        return true;
    }else{
        return false;
    }
}

module.exports = {checkValid};