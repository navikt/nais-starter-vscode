const axios = require('axios').default

const fetchAppConfig = async (appInfo) => {
    try {
        const response = await axios.post('https://start.nais.io/app', appInfo)   
        return response.data
    } catch (error) {
        // relay error msg from server
        throw error.response.data || 'unknown error'
    }
}

module.exports = {
    fetchAppConfig
}
