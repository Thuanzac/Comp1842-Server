const vocabController = require('../controllers/vocabController')
const vocabRoute = (app) =>{
    app.route('/vocab')
    .get(vocabController.viewVocabs)
    .post(vocabController.createVocab)
    .delete(vocabController.deleteAllVocabs)


// 2) With 'id' parameter
    app.route('/vocab/:id')
    .put(vocabController.editVocab)
    .delete(vocabController.deleteVocab)
    .get(vocabController.viewVocabById)

}
module.exports = vocabRoute