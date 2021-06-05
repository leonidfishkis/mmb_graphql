

function raid(parent, args, context, info) {
  return context.data.raids.findUnique({where: {raid_id: args.id}})
}

function raids(parent, args, context, info) 
{
  return context.data.raids.findMany()
}

module.exports = {
  raid,
  raids,
 }