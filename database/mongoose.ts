import mongoose from "mongoose";

const MONGODB_URI=process.env.MONGODB_URI;

declare global {
    var mongooseCache: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    }
}

let cached = global.mongooseCache;

if(!cached) {
    global.mongooseCache = {conn: null, promise: null};
    cached = global.mongooseCache;
}

export const connectToDatabase= async ()=> {
    if(!MONGODB_URI) throw new Error('MONGODB_URI must be set within .env');

    if(cached.conn) return cached.conn; // already connected — return mongoose instance

    if(!cached.promise){
        cached.promise = mongoose.connect(MONGODB_URI, {bufferCommands: false });
    }

    try {

        cached.conn = await cached.promise;
        
    } catch (error) {
        cached.promise = null;
        throw error;
    }

    console.log(`Connected to database`);
    return cached.conn;
}