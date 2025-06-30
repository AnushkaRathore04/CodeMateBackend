const mongoose = require("mongoose");

const connectDb = async () => {
    await mongoose.connect(
        "mongodb+srv://AnushkaRathore:9kaQbUQVbmJ06Ldq@backendnode.wtjpgpb.mongodb.net/devTinder"
    );
};
module.exports = {connectDb};

