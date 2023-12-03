import mongoose from "mongoose"

const userCollection = 'users'

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: Number,
  password: String,
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin']
  },
  status: {
    type: Boolean,
    default: true
  },
  CreateDate:{
    type: Date,
    default: Date.now
  }
})

userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.__v;
    return ret;
  }
})

const UserModel = mongoose.model(userCollection, userSchema)

export default UserModel