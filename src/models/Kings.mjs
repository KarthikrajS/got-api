import mongoose from 'mongoose';

const schema= new mongoose.Schema({
    Kings:{
        type:String,
        imageType:String
    }
})

export default mongoose.model('kings',schema);