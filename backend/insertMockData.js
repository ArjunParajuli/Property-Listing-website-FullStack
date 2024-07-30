import {readFile} from 'fs/promises'
import connectDB from './db/connectDB.js'
import dotenv from 'dotenv'
dotenv.config();

import Property from './models/Property.js';

const start = async() =>{
    try{
        await connectDB(process.env.DB_URL)
        await Property.deleteMany(); // delete all docs
        const jsonMockData = JSON.parse(await readFile(new URL('./MOCK_DATA.json', import.meta.url)))
        await Property.create(jsonMockData)
        console.log("Success");
        process.exit(0)
    }catch(err){
        console.log("In Catch")
        console.log(err)
        process.exit(1)
    }
}

start()