
const { isAuthenticate, isAdmin } = require('.')
const { raid, raids } = require('./raid/queries')
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
  isAuthenticate,
  isAdmin,
  checkWatchUserContact,
  checkWatchUserName,
  watchUserName,  
  watchUserEmail,  
  watchUserPhone, 
}