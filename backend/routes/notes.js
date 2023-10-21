const express = require("express");
const router = express.Router();
const Notes = require("../modules/Notes");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
// Route 1: Fetch all notes of a logged in user with get req /api/notes/fetchallnotes.mlogin login in req

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {

        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
    // res.send("this end point will help you fetch the notes stored ");
})

// Route 2: Add a new note with post req /api/notes/addnote.mlogin login in req

router.post('/addnote', fetchuser, [
    body('title', 'title must contain at least 1 character').isLength({ min: 1 }),
    body('description', 'description must contain at least 1 character').isLength({ min: 1 })],
    async (req, res) => {
        try {

            const { title, description, tag } = req.body;
            // if there are errors then return bad requests and also the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });

            }
            const note = new Notes({
                title, description, tag, user: req.user.id
            })
            const savednote = await note.save()
            res.json(savednote)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occured")
        }
    })
    // Route 3: to update an exisiting note using put req /api/notes/updatenote Login required
    router.put('/updatenote/:id',fetchuser,[
        body('title', 'title must contain at least 1 character').isLength({ min: 1 }),
    body('description', 'description must contain at least 1 character').isLength({ min: 1 })],
    async (req, res) => {
        try {

            const { title, description, tag } = req.body;
            // if there are errors then return bad requests and also the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });

            }
            // Create a newnote object
            const newNote={}
            if(title){newNote.title=title}
            if(description){newNote.description=description}
            if(tag){newNote.tag=tag}

            // Find the note to be updated and update it
             note =await Notes.findById(req.params.id)
            if(!note){return res.status(404).send("Note not found")}
            if(note.user.toString () !=req.user.id)
            {
                return res.send(401).send("This type of shit is not allowed")
            }
            note=await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true})
            res.send(note);
        }catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occured")
        }
    })


    // Route 4: to delete an exisiting note using put req /api/notes/deleteenote Login required
    router.delete('/deletenote/:id',fetchuser,
    async (req, res) => {
        try {
            // Find the note to be deleted and delete it
             note =await Notes.findById(req.params.id)
            if(!note){return res.status(404).send("Note not found")}

            // before deleting check if the user who is deleting is deleting his own note and not other's
            if(note.user.toString () !=req.user.id)
            {
                return res.send(401).send("This type of shit is not allowed")
            }
            note=await Notes.findByIdAndDelete(req.params.id)
            res.json({Success:"Note has been deleted",note:note});
        }catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occured")
        }
    })
module.exports = router