const { 
  login, 
  logout,
  editUserName,
  editUserEmail,
  editUserPhone,
  editUserCity,
  editUserBirthYear,
  editUserSex,
  hideName,
  prohibitAddInOtherTeams,
  allowSendOrgMessages,
  deleteUser,
  requestNewPassword,
  sendNewPassword,
 } = require('./user/mutations')

  module.exports = {
    login, 
    logout,
    editUserName,
    editUserEmail,
    editUserPhone,
    editUserCity,
    editUserBirthYear,
    editUserSex,
    hideName,
    prohibitAddInOtherTeams,
    allowSendOrgMessages,
    deleteUser,
    requestNewPassword,
    sendNewPassword,
  }

