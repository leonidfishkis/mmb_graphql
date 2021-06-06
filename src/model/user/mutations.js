const crypto = require('crypto');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, escapeString } = require('../../utils')

/* async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10)
  const user = await context.data.user.create({ data: { ...args, password } })
  const token = jwt.sign({ userId: user.id }, APP_SECRET)
  return {
    token,
    user,
  }
} */



async function login(parent, args, context, info) {
  const user = await context.data.users.findUnique({where: {user_email: escape(args.email)}})
  if (!user) {
    throw new Error('No such user found')
  }
  //console.log(user)
  const hashMd5 = crypto.createHash('md5').update(escape(args.password)).digest("hex");
  //console.log(hashMd5)
  //console.log(user.user_password)
  const valid = (hashMd5 === user.user_password)
  if (!valid) {
    throw new Error('Invalid password')
  }
  const token = jwt.sign({ userId: user.user_id }, APP_SECRET, {expiresIn: '1d'})
  return {
    token,
    user,
  }
}


//  logout discussion 

//  https://medium.com/devgorilla/how-to-log-out-when-using-jwt-a8c7823e8a6

//https://stackoverflow.com/questions/37959945/how-to-destroy-jwt-tokens-on-logout
//  use jwt-redis ?

async function logout(parent, args, context, info) {
  const token = null
  const user = null
  return {
    token,
    user,
  }
}

module.exports = {
  login,
  logout,
}


/* 
npm install regexp.escape

var escape = require('regexp.escape');
var assert = require('assert');
 
var str = 'hello. how are you?';
var regex = new RegExp(escape(str), 'g');
assert.equal(String(regex), '/hello\. how are you\?/g'); 

*/