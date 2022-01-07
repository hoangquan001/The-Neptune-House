const mongoose = require('mongoose');

async function connect() {

    try {

        await mongoose.connect(`mongodb+srv://sa:12345@cluster0.jjg1u.mongodb.net/The-coffee-house-clone-web?retryWrites=true&w=majority`,);
        console.log("successfully");
    } catch (e) {
        console.log("failuer");
    }
}

module.exports = { connect }