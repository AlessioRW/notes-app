const db = require('./db')
const {User,Note} = require('./models/index.model')

async function createDatabase() {
    await db.sync({
        force: true
    })

    await User.create({
        username: 'goku',
        password: 'kakarot'
    })

}

createDatabase()