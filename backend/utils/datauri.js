const DatauriParser = require('datauri/parser')

const parser = new DatauriParser();

const dataUri = (file) => parser.format('webp', file.buffer)

module.exports = dataUri
