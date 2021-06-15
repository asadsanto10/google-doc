const mongoose = require('mongoose');

const Docuement = mongoose.Schema({
  _id: String,
  data: Object,
});

module.exports = mongoose.model('Docuement', Docuement);
