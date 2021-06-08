const { 
  RaidState,
  getRaidState,
  checkViewRaid, 
  checkViewFinishPoint,
  checkHideRaidResults,
  checkUnHideRaidResults,
} = require('./rules')

async function raid(parent, args, context, info) {
  if (!(await checkViewRaid(parent, args, context)).success) {
    return null;
  } 
  return await context.data.raids.findUnique({where: {raid_id: args.id}})
}

async function raids(parent, args, context, info) 
{
  // https://advancedweb.hu/how-to-use-async-functions-with-array-filter-in-javascript/
  const asyncFilter = async (arr, predicate) => 
	  arr.reduce(async (memo, e) => 
		  [...await memo, ...await predicate(e) ? [e] : []]
	    , []);
  // read all raids from datasource  
  const allRaids = await context.data.raids.findMany()
  // applay rule
  const asyncRes = await asyncFilter(allRaids, async (x) => {
    return (await checkViewRaid(parent, { id: x.raid_id }, context)).success;  
  });
  //console.log(asyncRes)
  return asyncRes
}

module.exports = {
  raid,
  raids,
  RaidState,
  getRaidState,
  checkViewRaid,
  checkViewFinishPoint,
  checkHideRaidResults,
  checkUnHideRaidResults,
}