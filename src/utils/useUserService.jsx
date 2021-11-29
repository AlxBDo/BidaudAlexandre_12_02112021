import { useState, useEffect } from 'react'
import PropTypes from "prop-types"

import userService from '../services/userService'

const axios = require('axios').default;

useUserService.propTypes = {
    userId : PropTypes.number.isRequired,
    dataFrom : PropTypes.string.isRequired
}

/**
 * Retrieves user information
 * @param {integer} userId - user id 
 * @returns {object} {isLoading, data, error} contain data request 
 * @returns {boolean} objectReturn.isLoading - data is loading ?
 * @returns {object} objectReturn.data = { mainData: <object>, activity: <array>, sessions: <array>, keyData: <object>, performances: <object>, score: <number>}
 * @returns {boolean} objectReturn.error - An error has occurred ?
 */
function useUserService(userId, dataFrom) {
    const [data, setData] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    
    useEffect(() => {
        if (!userId){ 
            console.error("User ID is missing to perform the request !")
            return setError(true) 
        }
        switch(dataFrom){
            case "api" :
                let setDataFromAPi = (userInfos, userActivity, userSessions, userKeyData, userPerformance, userScore) => {
                    setData(userService.getDataObjectApi(userInfos, userActivity, userSessions, userKeyData, userPerformance, userScore))
                    setLoading(false)
                }
                Promise.all(userService.getByIdApiRequest(userId).map(request => axios.get(request)))
                    .then(axios.spread(setDataFromAPi))
                    .catch((error) => {
                        setError(true)
                        console.error(error);
                    });
                break
            case "mock" : 
                setData(userService.getByIdMocked(userId))
                setLoading(false)
                break
            default :
            console.error(
                "in the absence of the dataFrom parameter, it is impossible to know where to retrieve the user's data !"
            )
            setError(true) 
        }
    }, [userId, dataFrom])
    
    return { isLoading, data, error }
}

export default useUserService