const express = require("express")
const path = require('path')

const app = express();

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/css', express.static(path.join(__dirname, 'css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))
app.use('/js', express.static(path.join(__dirname, 'js')))
app.use('/img', express.static(path.join(__dirname, 'img')))

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'))
});

app.get("/api", (req, res) => {
  res.sendFile(path.join(__dirname, 'views/api.html'))
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, 'views/about.html'))
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, 'views/contact.html'))
});

app.listen(5000, () => {
  console.log('Listening on port ' + 5000);
});