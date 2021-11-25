import { useState, useEffect } from 'react'

const axios = require('axios').default;

/**
 * Retrieves user information from API
 * @param {integer} userId - user id 
 * @returns {object} {isLoading, data, error} contain data request 
 * @returns {boolean} objectReturn.isLoading - data is loading ?
 * @returns {object} objectReturn.data = { mainData: <object>, activity: <array>, sessions: <array>, keyData: <object>, performances: <object>, score: <number>}
 * @returns {boolean} objectReturn.error - An error has occurred ?
 */
function useUserApi(userId) {
  const [data, setData] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!userId){ 
        console.error("User ID is missing to perform the request !")
        return setError(true) 
    } else { 
        setError(false) 
        let dataRequest = [
            axios.get(`http://localhost:3000/user/${userId}`), 
            axios.get(`http://localhost:3000/user/${userId}/activity`), 
            axios.get(`http://localhost:3000/user/${userId}/average-sessions`),
            axios.get(`http://localhost:3000/user/${userId}/key-data`), 
            axios.get(`http://localhost:3000/user/${userId}/performance`), 
            axios.get(`http://localhost:3000/user/${userId}/today-score`) 
        ] 
        Promise.all(dataRequest)
            .then(axios.spread((userInfos, userActivity, userSessions, userKeyData, userPerformance, userScore) => {
                setData({
                    mainData: userInfos.data.data.userInfos, 
                    activity: userActivity.data.data.sessions,
                    sessions: userSessions.data.data.sessions,
                    keyData: userKeyData.data.data,
                    performances: userPerformance.data.data,
                    score: userScore.data.data
                })
                setLoading(false)
            }))
            .catch((error) => {
                setError(true)
                console.error(error);
            });
    }
  }, [userId])
  return { isLoading, data, error }
}

export default useUserApi