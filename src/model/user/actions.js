const { isAuthenticate } = require('..')
const { isAdmin } = require('..')
const Enum = require('enum');
const userActions = new Enum("view", "create", "edit", "delete", "watchUserName", "watchUserEmail", "watchUserPhone",)

async function checkWatchUserContact(parent, args, context) {
  // user himself or admin
  // args.id ensure by GraphQL schema for query watchUserContact, context.userId by isAuthenticate
  if (isAuthenticate(parent, args, context) && (args.id == context.userId || await isAdmin(parent, args, context)))  {
      return {success: true, message: '', code: ''}
  }
  return {success: false, message: 'No permissions', code: 'NO_PERMISSION'}
}

async function checkWatchUserName(parent, args, context) {
  // user not found or not hide the name
  const user = await context.data.users.findUnique({where: {user_id: args.id}, select: {user_noshow: true}})
  if (!user) {
    return {success: false, message: 'User not found', code: 'USER_NOT_FOUND'}
  }
  if (!user.user_noshow) {
    return {success: false, message: 'User does not hide his name', code: 'USER_DOES_NOT_HIDE_HIS_NAME'}
  }
  //  not authenticate
  if (!isAuthenticate(parent, args, context)) { 
    return {success: false, message: 'No permissions', code: 'NO_PERMISSION'}
  }
  // neither user nor admin
  // args.id ensure by GraphQL schema for query watchUserContact, context.userId by isAuthenticate
  if (args.id != context.userId && !await isAdmin(parent, args, context))  {
    return {success: false, message: 'No permissions', code: 'NO_PERMISSION'}
  }
  return {success: true, message: '', code: ''}
}

async function checkEditUser(parent, args, context) {
  // user himself or admin
  if (isAuthenticate(parent, args, context) && (args.id == context.userId || await isAdmin(parent, args, context)))  {
      return {success: true, message: '', code: ''}
  }
  return {success: false, message: 'No permissions', code: 'NO_PERMISSION'}
}


module.exports = {
  checkWatchUserContact,
  checkWatchUserName,
  checkEditUser,
}
