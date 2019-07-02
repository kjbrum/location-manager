const { getAirtableLocation } = require('../../utils/airtable')
const { serialize } = require('../../utils/helpers')

module.exports = (req, res) => {
    Promise.resolve(getAirtableLocation(req.query.id))
        .then(data => {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(serialize(data))
        })
        .catch(error => {
            console.log(error)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(serialize({}))
        })
}
