import { useState, useEffect } from 'react'

import { USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_MAIN_DATA, USER_PERFORMANCE } from "../datas/data"

const axios = require('axios').default;

/**
 * Retrieves user information
 * @param {integer} userId - user id 
 * @returns {object} {isLoading, data, error} contain data request 
 * @returns {boolean} objectReturn.isLoading - data is loading ?
 * @returns {object} objectReturn.data = { mainData: <object>, activity: <array>, sessions: <array>, keyData: <object>, performances: <object>, score: <number>}
 * @returns {boolean} objectReturn.error - An error has occurred ?
 */
function UserInformationCollector(userId, dataFrom) {
    const [data, setData] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    userId = parseInt(userId)

    useEffect(() => {
        if (!userId){ 
            console.error("User ID is missing to perform the request !")
            return setError(true) 
        } else {
            if(dataFrom === "api"){
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
            } else if(dataFrom === "mock"){
                setData({
                    mainData: USER_MAIN_DATA.filter(user => user.id === userId)[0].userInfos, 
                    activity: USER_ACTIVITY.filter(session => session.userId === userId)[0].sessions,
                    sessions: USER_AVERAGE_SESSIONS.filter(session => session.userId === userId)[0].sessions,
                    keyData: USER_MAIN_DATA.filter(user => user.id === userId)[0].keyData,
                    performances: USER_PERFORMANCE.filter(perf => perf.userId === userId)[0],
                    score: USER_MAIN_DATA.filter(user => user.id === userId)[0].todayScore
                })
                setLoading(false)
            } else {
                console.error(
                    "in the absence of the dataFrom parameter, it is impossible to know where to retrieve the user's data !"
                )
                return setError(true) 
            }
        }
    }, [dataFrom, userId])
    return { isLoading, data, error }
}

export default UserInformationCollector