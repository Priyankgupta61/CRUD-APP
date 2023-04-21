const mongoose  = require('mongoose');
const connectdb = async()=>{
    mongoose.set("strictQuery", false);
    const connnect = await mongoose.connect(`${process.env.MONGO_URI}`,);
    console.log(`mongoos connected ${connnect.connection.host}`);
}
module.exports = connectdb;