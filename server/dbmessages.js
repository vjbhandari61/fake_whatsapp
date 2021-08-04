import mongoose from 'mongoose'

const dbSchema = mongoose.Schema ({
    message: String,
    name : String,
    timespan: String,
    received: Boolean
});

export default mongoose.model('messagecontents', dbSchema);