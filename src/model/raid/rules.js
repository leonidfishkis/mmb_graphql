const { isAuthenticate } = require('..')
const { isAdmin } = require('..')

const Enum = require('enum');
const RaidState = new Enum({'Setup':1, 'Registration':2, 'LastCall':3, 'Boarding':4, 'Start':5, 'Finish':6, 'Release':7, 'Closed':8},  { freeze: true }) 

async function getRaidState(parent, args, context) {
  const raid = await context.data.raids.findUnique({where: {raid_id: args.id}})
  if (!raid) {
    return 0
  }
  if (!raid.raid_registrationenddate) {
    return 1
  }
  const registrationEndDate = raid.raid_registrationenddate
  const currentDateTime = new Date()
  if (currentDateTime < registrationEndDate) {
    return 2
  }

  // check lotto


  // check start and boarding time
  const startDateTime = currentDateTime
  const hoursBeforeStart = parseInt(raid.raid_readonlyhoursbeforestart)
  const boardingDateTime = startDateTime.setHours(startDateTime.getHours() - hoursBeforeStart);
  if (currentDateTime < boardingDateTime) {
    return 3
  }

  if (currentDateTime < startDateTime) {
    return 4
  }

  //  check start and finish time from raidlevelpoints

  const noShowResults = raid.raid_noshowresult 
  const closeDate = raid.raid_closedate
  if (noShowResults === null || noShowResults == 1) {
    return 6
  }

  if (currentDateTime < closeDate) {
    return 7
  }
  return 8
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
  if (await context.data.raids.findUnique({where: {raid_id: args.id, raid_noshowresult: 1}}))  {
    return {success: false, message: 'Results already hidden', code: 'RESULTS_ALREADY_HIDE'}
  }
  return {success: true, message: '', code: ''}
}

async function checkUnHideRaidResults(parent, args, context) {
  if (!await isAdmin(parent, args, context))  {
    return {success: false, message: 'No permissions', code: 'NO_PERMISSION'}
  }
  if (await context.data.raids.findUnique({where: {raid_id: args.id, raid_noshowresult: 0}}))  {
    return {success: false, message: 'Results already shown', code: 'RESULTS_ALREADY_SHOW'}
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
}