import mongoose from "mongoose";

const connectDB = async(db_url) => {
    try {
        await mongoose.connect(db_url, {dbName: "JobSol"});
        console.log("Connected to Atlas");
    } catch (err) {
        console.error("Err! Not connected to db ", err);
        if (err.name === 'MongooseServerSelectionError') {
            console.error("Ensure your IP address is whitelisted in MongoDB Atlas");
            console.error("IP Whitelisting Documentation: https://www.mongodb.com/docs/atlas/security-whitelist/");
        }
    }
};

export default connectDB;
