const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Board = new Schema({
    subject : String
    , contents : String
    , writer : String
    , date: {
        created: { type: Date, default: Date.now },
        edited: { type: Date, default: Date.now }
    }
    , tag : [String]
    , count : {type : Number, integer : true}
    , file : [{
        uploadedName : String
        , uploadedDir : String
        , originName : String
        , ext : String
        , mimeType : String
        , size : Number
        , state : {type : Number, integer : true}
    }]
    , state : {type : Number, integer : true}
});

module.exports = mongoose.model('board',Board);