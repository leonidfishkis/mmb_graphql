const { 
  checkViewFinishPoint,
} = require('./rules')


function id(parent, args, context) 
{
  return parent.raid_id
}

function name(parent, args, context) 
{
  return parent.raid_name
}

function timeFrame(parent, args, context) 
{
  return parent.raid_period
}

function startPoint(parent, args, context) 
{
  return parent.raid_startpoint
}

async function finishPoint(parent, args, context) 
{
  if (!(await checkViewFinishPoint(parent, { id: parent.raid_id }, context)).success) {
    return ''
  }    
  return parent.raid_finishpoint
}

function filePrefix(parent, args, context) 
{
  return parent.raid_fileprefix
}

function endRegistration(parent, args, context) {
  return parent.raid_registrationenddate
}

function closeResults(parent, args, context) {
  return parent.raid_closedate
}

function mapPrice(parent, args, context) {
  return parent.raid_mapprice
}

function readOnlyHoursBeforeStart(parent, args, context) 
{
  return parent.raid_readonlyhoursbeforestart
}

function teamsLimit(parent, args, context) 
{
  return parent.raid_teamslimit
}

module.exports = 
{
  id,
  name,
  timeFrame,
  startPoint,
  finishPoint,
  filePrefix,
  endRegistration,
  closeResults,
  mapPrice,
  readOnlyHoursBeforeStart,
  teamsLimit,
}