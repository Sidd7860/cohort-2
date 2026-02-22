const express = require('express');
const app = express();

app.use(express.json());
const noteModel = require('./models/notes.model');


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


module.exports = app;