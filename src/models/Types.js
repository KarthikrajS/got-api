import mongoose from 'mongoose';

const schema= new mongoose.Schema({
    types:{
        type:String
    }
})

export default mongoose.model('types',schema);