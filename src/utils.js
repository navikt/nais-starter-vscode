const csvToArray = (str) => str ? str.split(',').map((element) => element.trim())  : []

const decodeB64 = (b64Txt) => Buffer.from(b64Txt, 'base64').toString()

module.exports = {
    csvToArray,
    decodeB64
}