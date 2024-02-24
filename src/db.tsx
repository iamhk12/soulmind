import mongoose from 'mongoose';

const connectDB = async () => {
    const db = "mongodb+srv://innercalm:innercalm@innercalm.hyeb5s1.mongodb.net/innercalm"
    try {
        await mongoose.connect(db, {});
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

export default connectDB