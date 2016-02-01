'use strict';

let mongoose = require('mongoose');

let archiveSchema = new mongoose.Schema({
    title: String,
    source: String,
    created: Number, // just the milliseconds
    updated: Number,

    webPage: {
        contents: String,
        preview: Buffer,
    },

    text: {
        contents: String,
    },

    image: {
        data: Buffer,
    },

    audio: {
        data: Buffer,
    },

    video: {
        data: Buffer,
    },

    file: {
        data: Buffer,
    },
});

archiveSchema.pre('save', function(next) {
    let time = new Date().getTime();
    console.log(time);
    this.updated = time;
    if(!this.created)
        this.created = time;

    next();
})

module.exports = mongoose.model('Archive', archiveSchema);
