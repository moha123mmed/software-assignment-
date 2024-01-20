const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema
const staffSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  staffRole: {
    type: String,
    }
}
)
staffSchema.statics.signup = async function(name, email, password ) {
  if ( !name || !email || !password) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  const staff = await this.create({ name, email, password: hash })
  return staff
}
staffSchema.statics.login = async function(email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled')
  }
  const staff = await this.findOne({ email })
  if (!staff) {
    throw Error('Incorrect email')
  }
  const match = await bcrypt.compare(password, staff.password)
  if (!match) {
    throw Error('Incorrect password')
  }
  return staff
}
module.exports = mongoose.model('Staff', staffSchema)