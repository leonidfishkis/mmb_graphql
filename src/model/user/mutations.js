const crypto = require('crypto');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET } = require('../../utils')

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
  const user = await context.data.users.findUnique({where: {user_email: args.email}})
  if (!user) {
    throw new Error('No such user found')
  }
  //console.log(user)
  const hashMd5 = crypto.createHash('md5').update(args.password).digest("hex");
  //console.log(hashMd5)
  //console.log(user.user_password)
  const valid = (hashMd5 === user.user_password)
  if (!valid) {
    throw new Error('Invalid password')
  }
  const token = jwt.sign({ userId: user.user_id }, APP_SECRET)
  return {
    token,
    user,
  }
}

module.exports = {
  login,
}