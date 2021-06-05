
function name(parent, args, context) 
{
  return parent.raid_name
}

function id(parent, args, context) 
{
  return parent.raid_id
}

module.exports = 
{
  id,
  name,
}