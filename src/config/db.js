import mongoose from 'mongoose'

const connectDB= async()=>{
    try {
        console.log("connection establishing with the database")
        const connection= await mongoose.connect(process.env.DB_URI);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }

}

export default connectDB