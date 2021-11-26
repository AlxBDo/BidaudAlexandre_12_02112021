import PropTypes from "prop-types"

const axios = require('axios').default;

userApiService.propTypes = {
    dataRequest : PropTypes.array.isRequired,
    dataFunctionCallback : PropTypes.object.isRequired,
    errorFunctionCallback : PropTypes.object.isRequired
}

/**
 * 
 * @param {array} dataRequest - url list
 * @param {function} dataFunctionCallback  - function call by axios.spread to manage data
 * @param {function} errorFunctionCallback - error function. if error "true" will be passed in parameter
 */
function userApiService(dataRequest, dataFunctionCallback, errorFunctionCallback) {
    const axiosGet = dataRequest.map(request => axios.get(request))
    Promise.all(axiosGet)
        .then(axios.spread(dataFunctionCallback))
        .catch((error) => {
            errorFunctionCallback(true)
            console.error(error);
        });

}

export default userApiService