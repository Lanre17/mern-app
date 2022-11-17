const asyncHandler = require ("express-async-handler")

const Note = require("../models/noteModel")

// @desc Get Notes
// @route GET /api/notes
// @access PRIVATE
const getNotes = asyncHandler (async (req, res) => {
    const notes = await Note.find()
    res.status(200).json(notes)
})


// @desc POST Notes
// @route GET /api/notes
// @access PRIVATE
const createNote = asyncHandler (async (req, res) => {
   if (!req.body.title && !req.body.content)  {
    res.status(400)
    throw new Error ("Please add text values")
   }

   const note = await Note.create({
    title: req.body.title,
    content: req.body.content
   })
   res.status(200).json(note)
   
})

// @desc Get Notes
// @route GET /api/notes
// @access PRIVATE
const updateNote = asyncHandler (async (req, res) => {
    const note = await Note.findById (req.params.id)

    if (!note) {
        res.status(400)
        throw new Error ("Note not found")
    }

    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedNote)
})


// @desc Get Notes
// @route GET /api/notes
// @access PRIVATE
const deleteNote = asyncHandler (async (req, res) => {
    const note = await Note.findById(req.params.id)
    if (!note) {
    res.status(400)
    throw new Error ("Note not found")
}

    await note.remove()

    res.status(200).json({id: req.params.id})
})


module.exports = {
    getNotes,
    createNote,
    updateNote,
    deleteNote
}