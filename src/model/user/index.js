function email(parent, args, context) 
{
  return '*******'
}

async function name(parent, args, context) 
{
  //console.log(parent)
  const user = await context.data.users.findUnique({where: {user_id: parent.user_id}, select: {user_name: true, user_noshow: true}})
  return (user.user_noshow) ? 'User hide the name' : user.user_name
}
 
function id(parent, args, context) 
{
  return parent.user_id
}

module.exports = 
{
  id,
  email,
  name,
}