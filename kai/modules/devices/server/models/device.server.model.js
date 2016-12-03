'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Device Schema
 */
var DeviceSchema = new Schema({
  _name: {
    type: String,
    default: '',
    required: 'Please fill Device name',
    trim: true
  },
  _des: {
    type: String,
    default: 'No description provided yet'
  },
  _devid: {
    type: String,
    default: '#'
  },
  _devType: {
    type: Number,
    default: 1
  },
  _state: {
    type: Boolean,
    default: false
  },
  _status: {
    type: Number,
    default: 0
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Device', DeviceSchema);
