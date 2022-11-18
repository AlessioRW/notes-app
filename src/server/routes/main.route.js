const {User,Note} = require('../../db/models/index.model')
const {Router} = require('express')
const mainRouter = Router()

mainRouter.get('/:userId', async (req,res) => { //get all notes for a user
    const user = await User.findByPk(req.params.userId)
    const allNotes = await user.getNotes()
    res.status(200).send(allNotes)
})

mainRouter.post('/:userId', async (req,res) => { //create a new note
    const user = await User.findByPk(req.params.userId)

    const title = req.body.title
    const content = req.body.content

    if (content){ //note passed has data
        try{
            const newNote = await Note.create({
                title: title,
                content: content,
                padding: {x:0, y:0}
            })
            await user.addNote(newNote)
            res.sendStatus(200)
        } catch {
            res.sendStatus(500)
        }
    } else {
        res.sendStatus(400)
    }
})

mainRouter.put('/:noteId', async (req,res) => {
    try{
        const note = await Note.findByPk(req.params.noteId)
        const body = req.body

        await note.update({
            padding: {x: body.x, y:body.y}
        })
        res.sendStatus(200)
    } catch{
        res.sendStatus(500)
    }

}) 

mainRouter.delete('/:noteId', async (req,res) => { //delete a note
    try{
        const note = await Note.findByPk(req.params.noteId)
        await note.destroy()
    } catch { }
    res.sendStatus(200)
})

module.exports = mainRouter