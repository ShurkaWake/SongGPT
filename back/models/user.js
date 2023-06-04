var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  mongoosePaginate = require("mongoose-paginate-v2")

/**
 * User Schema
 */
var userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "fullname not provided "],
  },
  email: {
    type: String,
    unique: [true, "email already exists in database!"],
    lowercase: true,
    trim: true,
    required: [true, "email not provided"],
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: '{VALUE} is not a valid email!'
    }

  },
  password: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  songs: [
    {
        theme: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        created: {
            type: Date,
            default: Date.now
        }
    }
  ]
});

userSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('User', userSchema);