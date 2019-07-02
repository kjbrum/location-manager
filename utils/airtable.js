// Airtable
const Airtable = require('airtable')
Airtable.configure({
    apiKey: process.env.AIRTABLE_API_KEY,
})

module.exports = {
    // Get all Airtable locations
    getAirtableLocations: () => {
        const base = new Airtable.base(process.env.AIRTABLE_BASE_ID)

        return new Promise((resolve, reject) => {
            const allAirtableLocations = []

            base(process.env.AIRTABLE_TABLE_NAME)
                .select({
                    sort: [
                        {
                            field: 'title',
                            direction: 'asc',
                        },
                    ],
                })
                .eachPage(
                    (records, fetchNextPage) => {
                        // Get the fields
                        records.forEach(record => {
                            const location = {
                                id: record.id,
                                title: record.get('title'),
                                address: record.get('address'),
                                notes: record.get('notes'),
                            }

                            // Push location to
                            allAirtableLocations.push(location)
                        })

                        fetchNextPage()
                    },
                    error => {
                        if (error) {
                            console.error(error)
                            reject({ error })
                        }
                        resolve(allAirtableLocations)
                    },
                )
        })
    },

    // Get a single Airtable location
    getAirtableLocation: recordId => {
        const base = new Airtable.base(process.env.AIRTABLE_BASE_ID)

        return new Promise((resolve, reject) => {
            base(process.env.AIRTABLE_TABLE_NAME).find(
                recordId,
                (error, record) => {
                    if (error) {
                        console.error(error)
                        reject({ error })
                    }

                    const airtableLocation = {
                        title: record.get('title'),
                        address: record.get('address'),
                        notes: record.get('notes'),
                    }

                    resolve(airtableLocation)
                },
            )
        })
    },
}
