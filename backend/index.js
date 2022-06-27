const connectMongo = require("./db");
var cors = require('cors')
connectMongo();
const express = require("express");
const app = express();
const port = 80;

app.use(cors())
app.use(express.json())
app.get("/", (req,res)=>{
  res.send("char minar pe char chamar")
})

app.get("/home", (req,res)=>{
  res.send("Its login page")
})

app.use("/start", require("./routes/start"));
app.use("/notes", require("./routes/notes"));


app.listen(port, () => {

    console.log(`The server is running on http://localhost:${port} port `)
});