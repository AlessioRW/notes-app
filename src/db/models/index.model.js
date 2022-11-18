const User = require('./user.model')
const Note = require('./note.model')

User.hasMany(Note)
Note.belongsTo(User)

module.exports = {User, Note}