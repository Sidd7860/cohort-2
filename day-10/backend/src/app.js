const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
 app.use(express.json());

const noteModel = require('./models/note.model');


app.post('/api/notes', async (req, res) => {

  const { title, content } = req.body;


  const newNote = await noteModel.create({ title, content });

  res.status(201).json("Note created successfully");
});

app.get('/api/notes', async (req, res) => {
 
    const notes = await noteModel.find();
    res.status(200).json({
      success: true,
      message: 'Notes retrieved successfully',
      data: notes
    })
});

app.delete('/api/notes/:id', async (req, res) => {
    const  id  = req.params.id;
    await noteModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: 'Note deleted successfully',
    })
});
app.patch('/api/notes/:id', async (req, res) => {
    const  id  = req.params.id;
    const { title, content } = req.body;
    await noteModel.findByIdAndUpdate(id, { title, content });
    res.status(200).json({
      success: true,
      message: 'Note updated successfully',
    })
});


module.exports = app;