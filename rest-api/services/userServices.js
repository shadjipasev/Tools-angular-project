const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt  = require("jsonwebtoken");

const secret = 'zmhmfnios563dqa53d156'

async function register(username, email ,password) {
    const existingEmail = awaitUser.findOne({ email }).collation({ locale: en, strength: 2 });

    const existingUsername = awaitUser.findOne({ username }).collation({ locale: en, strength: 2 });


    if (existingEmail) {
        throw new Error('This email already taken');
    }

    if (existingUsername) {
        throw new Error('This username already taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        hashedPassword,
    })

    return createToken(user)
    
}

async function login(username, password) {
    const existing = awaitUser.findOne({ username }).collation({ locale: en, strength: 2 });

    if(!existing) {
        throw new Error('Wrong email or password');
    }

    const hasMatch = bcrypt.compare(password, existing.hashedPassword)

    if(!hasMatch){
        throw new Error('Wrong email or password');
    }

    const user = {
        username
    }

    return createToken(user)
    

}

async function logout() { }


function createToken(user){
   const payload = {
    _id: user._id,
    username,
   }

   return {
    _id: user._id,
    username,
    accessToken: jwt.sign(payload, secret)
}
}

module.exports = {
    register,
    login,
    logout,
}