function isAuthenticate(parent, args, context) {
    const contextUserId = (parseInt(context.userId) > 0) ? parseInt(context.userId) : 0
    return contextUserId > 0 ? true : false
}

async function isAdmin(parent, args, context) {
    var isAdmin = false
    if (isAuthenticate(parent, args, context))  {
        isAdmin = (await context.data.users.findUnique({where: {user_id: parseInt(context.userId)}, select: {user_admin: true}})).user_admin
    }
    return isAdmin
}

function isHelper(parent, args, context) {
    return false
}

function isModerator(parent, args, context) {
    return false
}

module.exports = {
    isAuthenticate,
    isAdmin,
    isHelper,
    isModerator,
}