const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
}); 
app.get('/about', (req, res) => {
  res.send('About page');
}); 
app.get('/home', (req, res) => {
  res.send('home page');
}); 
app.get('/contact',(req,res) => {
    res.send("contact page");
})
app.get('/hi',(req,res) => {
    res.send("hi page");
})
app.get('/hi',(req,res) => {
    res.send("hi page");
})
app.get('/bye',(req,res) => {
    res.send("bye page");
})

app.listen(3000)