const { 
  checkHideRaidResults,
  checkUnHideRaidResults,
} = require('./rules')

async function hideRaidResults(parent, args, context) 
{
  if (!(await checkHideRaidResults(parent, args, context)).success) {
    return null
  }    
  return await context.data.raids.update({where: {raid_id: args.id}, data: {raid_noshowresult: 1}})
}

async function unHideRaidResults(parent, args, context) 
{
  if (!(await checkUnHideRaidResults(parent, args, context)).success) {
    return null
  }    
  return await context.data.raids.update({where: {raid_id: args.id}, data: {raid_noshowresult: 1}})
}

module.exports = {
  hideRaidResults,
  unHideRaidResults,
}
