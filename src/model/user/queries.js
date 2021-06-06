const { checkWatchUserContact, checkWatchUserName, checkEditUser } = require('./actions')

function user(parent, args, context, info) {
  return context.data.users.findUnique({where: {user_id: args.id}})
}

function users(parent, args, context, info) {
  return context.data.users.findMany()
}

async function watchUserName(parent, args, context, info) {
  const check = await checkWatchUserName(parent, args, context)
  if (!check.success)  {
    throw new Error(check.message);
  }
  return (await context.data.users.findUnique({where: {user_id: args.userId}, select: {user_name: true}})).user_name
}

async function watchUserEmail(parent, args, context, info) {
  const check = await checkWatchUserContact(parent, args, context)
  if (!check.success)  {
    throw new Error(check.message);
  }
  return (await context.data.users.findUnique({where: {user_id: args.id}, select: {user_email: true}})).user_email
}

async function watchUserPhone(parent, args, context, info) {
  const check = await checkWatchUserContact(parent, args, context)
  if (!check.success)  {
    throw new Error(check.message);
  }
  return (await context.data.users.findUnique({where: {user_id: args.id}, select: {user_phone: true}})).user_phone
}


module.exports = {
  user,
  users,
  watchUserName,
  watchUserEmail,
  watchUserPhone,
  checkWatchUserContact,
  checkWatchUserName,
  checkEditUser,
}