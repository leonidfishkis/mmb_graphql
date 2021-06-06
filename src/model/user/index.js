function id(parent, args, context) {
  return parent.user_id
}

function email(parent, args, context) {
  return '*******'
}

async function name(parent, args, context) {
  //console.log(parent)
  const user = await context.data.users.findUnique({where: {user_id: parent.user_id}, select: {user_name: true, user_noshow: true}})
  return (user.user_noshow) ? 'User hide the name' : user.user_name
}

function city(parent, args, context) {
  return parent.user_city
}

function phone(parent, args, context) {
  return '*******'
}

function birthYear(parent, args, context) {
  return parent.user_birthyear
}

function sex(parent, args, context) {
  return parent.user_sex
}

function hideName(parent, args, context) {
  return parent.user_noshow
}

function allowSendOrgMessages(parent, args, context) {
  return parent.user_allowsendorgmessages
}

function prohibitAddInOtherTeams(parent, args, context) {
  return parent.user_prohibitadd
}

function r6(parent, args, context) {
  return parent.user_r6
}

function noInvitation(parent, args, context) 
{
  return parent.user_noinvitation
}


module.exports = 
{
  id,
  email,
  name,
  city,
  phone,
  birthYear,
  sex,
  hideName,
  prohibitAddInOtherTeams,
  allowSendOrgMessages,
  r6,
  noInvitation,
}