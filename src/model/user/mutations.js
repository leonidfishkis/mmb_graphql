const crypto = require('crypto');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, escapeString } = require('../../utils')

/* 
escape strings


npm install regexp.escape

var escape = require('regexp.escape');
var assert = require('assert');
 
var str = 'hello. how are you?';
var regex = new RegExp(escape(str), 'g');
assert.equal(String(regex), '/hello\. how are you\?/g'); 

*/

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
//  https://stackoverflow.com/questions/37959945/how-to-destroy-jwt-tokens-on-logout
//  use jwt-redis ?
async function logout(parent, args, context, info) {
  const token = null
  const user = null
  return {
    token,
    user,
  }
}

const { checkEditUser } = require('./rules')

async function editUserName(parent, args, context, info) {
  const check = await checkEditUser(parent, args, context)
  if (!check.success)  {
    throw new Error(check.message);
  }

  // to do check input data 
  return await context.data.users.update({where: {user_id: args.id}, data: {user_name: args.name}})
}

async function editUserEmail(parent, args, context, info) {
  const check = await checkEditUser(parent, args, context)
  if (!check.success)  {
    throw new Error(check.message);
  }

  // to do check input data 
  return await context.data.users.update({where: {user_id: args.id}, data: {user_email: args.email}})
}

async function editUserPhone(parent, args, context, info) {
  const check = await checkEditUser(parent, args, context)
  if (!check.success)  {
    throw new Error(check.message);
  }

  // to do check input data 
  return await context.data.users.update({where: {user_id: args.id}, data: {user_phone: args.phone}})
}

async function editUserCity(parent, args, context, info) {
  const check = await checkEditUser(parent, args, context)
  if (!check.success)  {
    throw new Error(check.message);
  }

  // to do check input data 
  return await context.data.users.update({where: {user_id: args.id}, data: {user_city: args.city}})
}

async function editUserBirthYear(parent, args, context, info) {
  const check = await checkEditUser(parent, args, context)
  if (!check.success)  {
    throw new Error(check.message);
  }

  // to do check input data 
  return await context.data.users.update({where: {user_id: args.id}, data: {user_birthyear: args.birthYear}})
}

async function editUserSex(parent, args, context, info) {
  const check = await checkEditUser(parent, args, context)
  if (!check.success)  {
    throw new Error(check.message);
  }

  // to do check input data 
  return await context.data.users.update({where: {user_id: args.id}, data: {user_sex: args.sex}})
}

async function hideName(parent, args, context, info) {
  const check = await checkEditUser(parent, args, context)
  if (!check.success)  {
    throw new Error(check.message);
  }

  // to do check input data 
  return await context.data.users.update({where: {user_id: args.id}, data: {user_noshow: args.hideName}})
}

async function prohibitAddInOtherTeams(parent, args, context, info) {
  const check = await checkEditUser(parent, args, context)
  if (!check.success)  {
    throw new Error(check.message);
  }

  // to do check input data 
  return await context.data.users.update({where: {user_id: args.id}, data: {user_prohibitadd: args.prohibitAddInOtherTeams}})
}

async function allowSendOrgMessages(parent, args, context, info) {
  const check = await checkEditUser(parent, args, context)
  if (!check.success)  {
    throw new Error(check.message);
  }

  // to do check input data 
  return await context.data.users.update({where: {user_id: args.id}, data: {user_allowsendorgmessages: args.allowSendOrgMessages}})
}

async function deleteUser(parent, args, context, info) {
  const check = await checkEditUser(parent, args, context)
  if (!check.success)  {
    throw new Error(check.message);
  }
  return true
}

async function requestNewPassword(parent, args, context, info) {
  const check = await checkEditUser(parent, args, context)
  if (!check.success)  {
    throw new Error(check.message);
  }
  return true
}

async function sendNewPassword(parent, args, context, info) {
  const check = await checkEditUser(parent, args, context)
  if (!check.success)  {
    throw new Error(check.message);
  }
  return true
}

module.exports = {
  login,
  logout,
  editUserName,
  editUserEmail,
  editUserPhone,
  editUserCity,
  editUserBirthYear,
  editUserSex,
  hideName,
  prohibitAddInOtherTeams,
  allowSendOrgMessages,
  deleteUser,
  requestNewPassword,
  sendNewPassword,
}