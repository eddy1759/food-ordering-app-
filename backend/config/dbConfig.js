const mongoose = require('mongoose');
const CONFIG = require("./Configs");


function dbSetUp() {
    mongoose.set('strictQuery', true);
    mongoose.connect(CONFIG.MONGO_URI);

    mongoose.connection.on("connected", () => {
        console.info("Database connected successfully")
    })

    mongoose.connection.on("error", (error) => {
        console.error("An error occurred while trying to connect to the database", error)
    })
}

module.exports = dbSetUp

