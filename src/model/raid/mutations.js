const { 
  checkHideRaidResults,
  checkUnHideRaidResults,
  checkCreateRaid,
} = require('./rules')

async function hideRaidResults(parent, args, context) 
{
  const check = await checkHideRaidResults(parent, args, context)
  if (!check.success) {
    return null
  }    
  return await context.data.raids.update({where: {raid_id: args.id}, data: {raid_noshowresult: 1}})
}

async function unHideRaidResults(parent, args, context) 
{
  const check = await checkUnHideRaidResults(parent, args, context)
  if (!check.success) {
    return null
  }    
  return await context.data.raids.update({where: {raid_id: args.id}, data: {raid_noshowresult: 1}})
}

async function createRaid(parent, args, context) 
{
  const check = await checkCreateRaid(parent, args, context)
  if (!check.success) {
    return null
  }    
  return await context.data.raids.create({data: {raid_name: args.name, raid_period: args.timeFrame, raid_fileprefix: args.filePrefix}})
}



module.exports = {
  hideRaidResults,
  unHideRaidResults,
  createRaid,
}
