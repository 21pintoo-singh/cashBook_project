const express = require('express')
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js')
const mongoose = require('mongoose')
const logs = require('./middleWare/log')

const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// ➡️ DB connection here --- mongodb+srv://firstDB:XXXXXXXXXXXXXXX@cluster0.kgij2.mongodb.net/<DATABASE-NAME>
mongoose.connect("mongodb+srv://firstDB:zwPu7dwJG0RCXU9f@cluster0.kgij2.mongodb.net/cashBook-DB?retryWrites=true&w=majority", {
        useNewUrlParser: true
    })
    .then(() => console.log("🥳 ", "MongoDb is connected"))
    .catch(err => console.log("❌ ", err.message));



app.use('/', logs, routes) // logs for checking activity

app.all('/**', (req, res) => {
    res.status(404).send({
        status: false,
        message: "⚠️ The URL you try to access is NOT exist!"
    })
})

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})