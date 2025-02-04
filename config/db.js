import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING_BLOG);
        console.log(`database connected : ${connect.connection.host} , ${connect.connection.name}`);
    } catch (error) {
        console.error('MongoDB Connection Failed:', error.message);
        process.exit(1);
    }
};

export {connectDB};
