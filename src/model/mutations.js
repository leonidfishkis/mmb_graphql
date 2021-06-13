const { 
  login, 
  logout,
  editUserName,
  editUserEmail,
  editUserPhone,
  editUserCity,
  editUserBirthYear,
  editUserSex,
  hideUserName,
  prohibitAddUserInOtherTeams,
  allowSendUserOrgMessages,
  deleteUser,
  requestNewPassword,
  sendNewPassword,
 } = require('./user/mutations')

 const { 
  hideRaidResults,
  unHideRaidResults,
  createRaid,
 } = require('./raid/mutations')


  module.exports = {
    login, 
    logout,
    editUserName,
    editUserEmail,
    editUserPhone,
    editUserCity,
    editUserBirthYear,
    editUserSex,
    hideUserName,
    prohibitAddUserInOtherTeams,
    allowSendUserOrgMessages,
    deleteUser,
    requestNewPassword,
    sendNewPassword,
    hideRaidResults,
    unHideRaidResults,
    createRaid,
  } 

