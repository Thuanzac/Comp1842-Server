const mongoose = require('mongoose');

// Update Schema
const VocabSchema = new mongoose.Schema({
    english: { 
        type: String, 
        required: [true, 'English word is required'] 
    },
    german: { 
        type: String, 
        required: [true, 'German word is required'] 
    }
});

const VocabModel = mongoose.model("vocabs", VocabSchema);

module.exports = VocabModel;
