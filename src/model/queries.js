
const { isAuthenticate, isAdmin } = require('.')
const { 
  raid, 
  raids,
  getRaidState,
  checkViewRaid,
  checkViewFinishPoint,
  checkHideRaidResults,
  checkUnHideRaidResults,
} = require('./raid/queries')

const { 
  user, 
  users,
  watchUserName,  
  watchUserEmail,  
  watchUserPhone, 
  checkWatchUserContact,
  checkWatchUserName,
} = require('./user/queries')

module.exports = {
  user,
  users,
  raid,
  raids,
  getRaidState,
  checkViewRaid,
  checkViewFinishPoint,
  checkHideRaidResults,
  checkUnHideRaidResults,
  isAuthenticate,
  isAdmin,
  checkWatchUserContact,
  checkWatchUserName,
  watchUserName,  
  watchUserEmail,  
  watchUserPhone, 
}