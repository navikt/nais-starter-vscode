const csvToArray = (str) => str ? str.split(',').map((feature) => feature.trim())  : []

const decodeB64 = (b64Txt) => Buffer.from(b64Txt, 'base64').toString()

module.exports = {
    csvToArray,
    decodeB64
}