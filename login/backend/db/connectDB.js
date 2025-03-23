import mongoose from 'mongoose'

export const connect = async () => {
    try{
        await mongoose.connect(`${ process.env.MONGODB_URI }/login`)
        .then(()=> console.log("MongoDB Connected"))
    }catch(err){
        console.log('Oops! something went wrong..');
        console.error(err);
    }
}
