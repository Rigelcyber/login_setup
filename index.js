var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))
mongoose.connect('mongodb://127.0.0.1:27017/Database')
var db = mongoose.connection
db.on('error', () => console.log("Error is connecting to Database"))
db.once('open', () => console.log("Connected to Database"))

app.post("/sign_up", (req, res) => {
    var name = req.body.name
    var age = req.body.age
    var email = req.body.email
    var phone = req.body.phone
    var gender = req.body.gender
    var password = req.body.password

    var data = {
        "name": name,
        "age": age,
        "email": email,
        "phone": phone,
        "gender": gender,
        "password": password
    }
    db.collection('users').insertOne(data, (error, collection) => {
        if (error) {
            throw error;
        }
        console.log("Record Inserted Succesfully")
    })
    return res.redirect('signup_success.html')
})

app.get("/", (req, res) => {
    res.set({
        "Allow-acces-Allow-Origin": '*'
    })
    return res.redirect('index.html')
}).listen(3000);

console.log("Listening on port")