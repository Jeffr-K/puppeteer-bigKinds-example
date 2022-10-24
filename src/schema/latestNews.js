const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Id = Schema.ObjectId;

const LatestNews = new Schema({
    author: String,
    title: String,
    content: String,
    origin: String,
    date: Date,
})

module.exports = mongoose.model('LatestNews', LatestNews);
