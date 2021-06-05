
function user(parent, args, context, info) {
  return context.data.users.findUnique({where: {user_id: args.id}})
}

function users(parent, args, context, info) {
  return context.data.users.findMany()
}


module.exports = {
  user,
  users,
}