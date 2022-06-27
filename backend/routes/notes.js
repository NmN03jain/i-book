const express = require("express");
const router = express.Router();
const Notes = require('../models/Notes');
var fetch = require("../middleware/fetch");
const { body, validationReuslt } = require("express-validator");
const req = require("express/lib/request");


// Router 1
// For fetch all the notes
router.get("/fetchNotes", fetch, async (req, res) => {

    try {

        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("problem in notes section")

    }
})


// Route 2
// For adding new note
router.post("/addingNotes", fetch, [
    body('title', "Your title must be more thab 4 words").isLength({ min: 4 }),
    body('description', "You description must more than 5 character ").isLength({ min: 5 }),
], async (req, res) => {
    try {

        const { title, description, tag } = req.body



        const notes = new Notes({
            title, description, tag, user: req.user.id
        })

        const saveNotes = await notes.save()
        res.json(saveNotes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("problem in notes section")

    }
})


// Route 3
// Updating and Deleting notes

router.put("/Update/:id",fetch, async (req,res)=>{

    const {title,description,tag} = req.body
    try{

        
        const newNotes = {};
        if(title){newNotes.title = title}
        if(description){newNotes.description = description}
        if(tag){newNotes.tag = tag}
        
        let note = await Notes.findById(req.params.id)
        if(!note){
            return res.status(404).send("pls enter valid id");
        }
        
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Authorized");
            
        }
        
        note = await Notes.findByIdAndUpdate(req.params.id , {$set : newNotes}, {new:true});
        
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("problem in notes section")

    }

})

// Route 4 
// Delete Notes

router.delete("/DeleteNotes/:id",fetch, async(req,res)=>{
    const {title,description,tag} = req.body;
    try{
    let note = await Notes.findById(req.params.id)
    if(!note){
        return res.status(404).send("pls enter valid id");
    }

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Authorized");

    }

    note = await Notes.findByIdAndDelete(req.params.id);

    res.json("succesfully Deleted");
    
} catch (error) {
    console.error(error.message);
    res.status(500).send("problem in notes section")

}

})



module.exports = router