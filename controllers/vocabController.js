const VocabModel = require('../models/vocabModel');

// View all vocab entries
const viewVocabs = async (req, res) => {
    try {
        const vocabs = await VocabModel.find();
        res.status(200).json(vocabs);
    } catch (err) {
        console.error(err); 
        res.status(500).json({ error: "Server error, unable to retrieve vocab entries." });
    }
};

// View vocab entry by ID
const viewVocabById = async (req, res) => {
    try {
        const id = req.params.id;
        const vocab = await VocabModel.findById(id);

        if (!vocab) {
            return res.status(404).json({ error: "Vocab not found" });
        }

        res.status(200).json(vocab);
    } catch (err) {
        console.error(err); 
        res.status(500).json({ error: "Error retrieving vocab entry by ID" });
    }
};

// Create a new vocab entry
const createVocab = async (req, res) => {
    const { english, german } = req.body;

    //check data 
    if (!english || !german) {
        return res.status(400).json({ error: "Both English and German fields are required." });
    }

    try {
        const newVocab = new VocabModel({ english, german });
        await newVocab.save();
        res.status(201).json(newVocab); // return new word
    } catch (err) {
        console.error(err); 
        res.status(500).json({ error: "Server error while creating new vocab entry." });
    }
};

// Delete all vocab entries
const deleteAllVocabs = async (req, res) => {
    try {
        await VocabModel.deleteMany({});
        res.status(200).json({ message: "All vocab entries deleted successfully" });
    } catch (err) {
        console.error(err); 
        res.status(500).json({ error: "Error deleting all vocab entries." });
    }
};

// Update a vocab entry by ID
const editVocab = async (req, res) => {
    try {
        const updatedVocab = await VocabModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        if (!updatedVocab) {
            return res.status(404).json({ error: "Vocab not found" });
        }

        res.status(200).json(updatedVocab); // return new word edit
    } catch (err) {
        console.error(err); // In lỗi để dễ debug
        res.status(500).json({ error: "Error updating vocab entry." });
    }
};

// Delete a single vocab entry by ID
const deleteVocab = async (req, res) => {
    try {
        const vocab = await VocabModel.findByIdAndDelete(req.params.id);

        if (!vocab) {
            return res.status(404).json({ error: "Vocab not found" });
        }

        res.status(200).json({ message: "Vocab deleted successfully" });
    } catch (err) {
        console.error(err); 
        res.status(500).json({ error: "Error deleting vocab entry." });
    }
};

module.exports = {
    viewVocabs,
    createVocab,
    deleteAllVocabs,
    editVocab,
    deleteVocab,
    viewVocabById
};
