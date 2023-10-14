import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
  avatar: {
    type: String
  },
  userName: {
    type: String,
    require: true,
    unique: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true,
    minlength: 8
  },
  directories: [{
    nameDirectory: { type: String },
    files: [{
      nameFile: { type: String },
      Date: { type: String },
      size: { type: Number }
    }]
  }],
  premium: {
    type: Boolean,
    default: false
  },
  space: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  versionKey: false
})

const UserModel = model('user', UserSchema)

export default UserModel
