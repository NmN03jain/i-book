const mongoose = require('mongoose');
const mongoUrl = "mongodb://localhost:27017/Mybook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";




// " mongodb://localhost:27017/Mybook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const connectMongo = () =>{
    mongoose.connect(mongoUrl, ()=>{
        console.log("connected")
    } )
}



module.exports = connectMongo;

