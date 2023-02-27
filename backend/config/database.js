const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const connectDatabase = () =>{
    mongoose.connect("mongodb://localhost:27017").then(con =>{
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
    })
}
module.exports = connectDatabase;
// exports.connectDatabase = connectDatabase;