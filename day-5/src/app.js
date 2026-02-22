 const express = require('express');
 const app = express();
app.use(express.json());
const notes = [];


app.post('/notes', (req, res) => {
    console.log(req.body)
notes.push(req.body);
res.status(201).json({ notes: notes });


});

app.get('/notes', (req, res) => {
    res.status(200).json({ message: 'Notes retrieved successfully', data: notes });
});


app.delete("/notes/:index", (req, res) => {
delete notes[req.params.index];
res.status(200).json({ message: 'Note deleted successfully' });
});
 module.exports = app;