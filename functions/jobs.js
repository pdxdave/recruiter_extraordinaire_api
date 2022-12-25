// http://localhost:8888/api/jobs
require('dotenv').config()
const Airtable = require('airtable-node')

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE)
  .table('jobs')

exports.handler = async (event, context) => {
    try {
        const {records} = await airtable.list()
        const jobs = records.map((job) => {
            const {id} = job
            const {title, key_words, description, requirements, duties, benefits, city, state} = job.fields 
            return {title, key_words, description, requirements, duties, id, benefits, city, state}
        })
        return {
            headers: {
                'Access-Control-Allow-Origin' : '*'
            },
            statusCode: 200,
            body: JSON.stringify(jobs)
        }
    } catch (error) {
        return {
            status: 500,
            body: 'There was a server error'
        }
    }
}