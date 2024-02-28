const axios = require('axios')

const getApi = (config) => {

    return new Promise((resolve, reject) => {
        // let url = baseUrl + config.endpoint
        const options = {
            method: config.method,
            url: config.url,
            headers: config.headers,
            data: config.data,
            timeout: 70000
        }
        // logger.info(`config ${JSON.stringify(options)}`)

        axios(options)
            .then(async (response) => {
                // console.log(`response`,response.data)

                // alert(response.status)
                let json = {
                    status: response.status ? response.status : 200,
                    data: response?.data ?? {}
                }

                resolve(json);
            })
            .catch(async (error) => {
                // console.log(error.response)
                // AppUtils.showMessage('error',error.response)
                // logger.info(`error ${error}`)
                let response = error.response
                let json = {}
                if (response ) {
                 
                    //   resolve(101, error.message);
                    // alert(config.url)
                    console.log(`error response data`, response?.data ?? {})
                    let errorMessage = 'Something went wrong'
                    if(response && response.data && response.data.message) {
                        errorMessage = response.data.message
                    } 
                    else if(response && response.data && response.data.error) {
                        errorMessage = response.data.error
                    }
                    
                    json = {
                        status: response && response.status ? response.status : 101,
                        data: response?.data?.data??{},
                        errors: errorMessage
                    }
                    console.log('json ',json)
                    resolve(json)
                } else{
                    // AppUtils.showMessage('in else',error.response)
                    resolve(error)    
                }
                
            });

    })
}

module.exports = {
    getApi
}
