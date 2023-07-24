//require('dotenv').config()

const express = require('express')
const mongoose = require("mongoose");
const NewUser = require("./Schemas/NewUser")


const app = express()
const port = "http://localhost:5000";
const url = "mongodb+srv://user1:kmit1@cluster0.7pq8ivp.mongodb.net/CG?retryWrites=true&w=majority"

mongoose.set("strictQuery", true)



mongoose.connect(url)
    .then(() => console.log("Connection Established")).catch((err) => {
        console.log(err)
    })

app.use(express.json())

app.post("/NewUser", (req, res) => {
    console.log(req.body);
    const { UserName, password, email } = req.body
    const user = NewUser({ UserName, password, email })
    user.save()
    res.send("Exam Hai aaj")
}
)
app.post("/kaus",(req, res) => {
    console.log("Iam here")
    console.log(req.body);
    const { UserName, password, email } = req.body
    const temp = NewUser({ UserName, password, email })
    temp.save()
    res.send("Exam Hai aaj")
}
)

app.listen(5000, (err) => {
    console.log(`Server is running on ${port}`)
})