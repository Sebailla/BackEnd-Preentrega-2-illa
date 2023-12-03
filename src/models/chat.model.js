import mongoose from "mongoose"

const chatCollection = 'messages'

const chatSchema = new mongoose.Schema({
  user:{type: String, required: true},
  message:{type: String}
})

chatSchema.set('toJSON',{
  transform: function(doc,ret){
    delete ret.__v;
    return ret;
  }
})

const chatModel = mongoose.model(chatCollection, chatSchema)

export default chatModel