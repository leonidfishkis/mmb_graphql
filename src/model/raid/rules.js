const { isAuthenticate } = require('..')
const { isAdmin } = require('..')

const Enum = require('enum');
const RaidState = new Enum({'Setup':1, 'Registration':2, 'LastCall':3, 'Boarding':4, 'Start':5, 'Finish':6, 'Release':7, 'Closed':8},  { freeze: true }) 

async function getRaidState(parent, args, context) {
  const raidMatchNumber = await context.data.raids.count({where: {raid_id: args.id}})
  if (!raidMatchNumber) {
    return 0
  }
  const raid = await context.data.raids.findUnique({where: {raid_id: args.id}})
  const registrationEndDate = raid.raid_registrationenddate
  const currentDateTime = new Date()
  const startDateTime = currentDateTime
  const hoursBeforeStart = parseInt(raid.raid_readonlyhoursbeforestart)
  const boardingDateTime = startDateTime.setHours(startDateTime.getHours() - hoursBeforeStart);
  const noShowResults = raid.raid_noshowresult 
  const closeDate = raid.raid_closedate
  

  if (registrationEndDate === null) {
    return 1
  }
  if (currentDateTime < registrationEndDate) {
    return 2
  }
  if (closeDate != null) {
    if (noShowResults == 0) {
      return 7
    }
    if (currentDateTime > closeDate) {
      return 8
    }
  }
  
  return 3 // 4,5,6
  // check lotto
  // check start and boarding time
  //  check start and finish time from raidlevelpoints

}

async function checkViewRaid(parent, args, context) {
  // admin - always, user - if in state 'Registration' or later 
  if (await isAdmin(parent, args, context))  {
      return {success: true, message: '', code: ''}
  }
  if (await getRaidState(parent, args, context) >= RaidState.Registration)  {
    return {success: true, message: '', code: ''}
  }
  return {success: false, message: 'No permissions', code: 'NO_PERMISSION'}
}

async function checkViewRaidFinishPoint(parent, args, context) {
  // admin - always, user - if in state 'Finish' or later 
  if (await isAdmin(parent, args, context))  {
      return {success: true, message: '', code: ''}
  }
  if (await getRaidState(parent, args, context) >= RaidState.Finish)  {
    return {success: true, message: '', code: ''}
  }
  return {success: false, message: 'No permissions', code: 'NO_PERMISSION'}
}

async function checkHideRaidResults(parent, args, context) {
  if (!await isAdmin(parent, args, context))  {
    return {success: false, message: 'No permissions', code: 'NO_PERMISSION'}
  }
  const  raidMatchNumber = await context.data.raids.count({where: {raid_id: args.id, raid_noshowresult: 0}})
  if (!raidMatchNumber)  {
    return {success: false, message: 'Raid not found or results already hidden', code: 'RAID_NOT_FOUND_OR_RESULTS_ALREADY_HIDDEN'}
  }
  return {success: true, message: '', code: ''}
}

async function checkUnHideRaidResults(parent, args, context) {
  if (!await isAdmin(parent, args, context))  {
    return {success: false, message: 'No permissions', code: 'NO_PERMISSION'}
  }
  const  raidMatchNumber = await context.data.raids.count({where: {raid_id: args.id, raid_noshowresult: 1}})
  if (!raidMatchNumber)  {
    return {success: false, message: 'Raid not found or results already shown', code: 'RAID_NOT_FOUND_OR_RESULTS_ALREADY_SHOW'}
  }
  return {success: true, message: '', code: ''}
}

async function checkCreateRaid(parent, args, context) {
  if (!await isAdmin(parent, args, context))  {
    return {success: false, message: 'No permissions', code: 'NO_PERMISSION'}
  }
  const raidMatchNumber = await context.data.raids.count({where: {OR: [{raid_closedate: null}, {raid_closedate: {gt: new Date()}}]}})  
  //console.log(raidMatchNumber)
  if (raidMatchNumber)  {
    return {success: false, message: 'An open raid exists', code: 'OPEN_RAID_EXISTS'}
  }
  return {success: true, message: '', code: ''}
}

async function checkEditRaid(parent, args, context) {
  if (!await isAdmin(parent, args, context))  {
    return {success: false, message: 'No permissions', code: 'NO_PERMISSION'}
  }
  if (await getRaidState(parent, args, context) >= RaidState.Closed)  {
    return {success: false, message: 'This raid is closed', code: 'RAID_CLOSED'}
  }
  return {success: true, message: '', code: ''}
}


module.exports = {
  RaidState,
  getRaidState,
  checkViewRaid,
  checkViewRaidFinishPoint,
  checkHideRaidResults,
  checkUnHideRaidResults,
  checkCreateRaid,
  checkEditRaid,
}