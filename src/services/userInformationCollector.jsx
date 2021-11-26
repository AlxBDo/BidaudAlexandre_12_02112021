import { useState, useEffect } from 'react'
import PropTypes from "prop-types"

import userApiService from './userApiService';
import { USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_MAIN_DATA, USER_PERFORMANCE } from "../datas/data"

UserInformationCollector.propTypes = {
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
function UserInformationCollector(userId, dataFrom) {
    const [data, setData] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const setUserData = (userInfos, userActivity, userSessions, userKeyData, userPerformance, userScore) => 
            {
                setData({
                    mainData: userInfos, 
                    activity: userActivity,
                    sessions: userSessions,
                    keyData: userKeyData,
                    performances: userPerformance,
                    score: userScore
                })
                setLoading(false)
            }
    
    useEffect(() => {
        if (!userId){ 
            console.error("User ID is missing to perform the request !")
            return setError(true) 
        } else {
            if(dataFrom === "api"){
                const baseUrlApi = `http://localhost:3000/user/${userId}`
                const dataRequest = [
                    baseUrlApi, 
                    `${baseUrlApi}/activity`, 
                    `${baseUrlApi}/average-sessions`, 
                    `${baseUrlApi}/key-data`, 
                    `${baseUrlApi}/performance`, 
                    `${baseUrlApi}/today-score` 
                ]
                const dataFunctionCallback = (userInfos, userActivity, userSessions, userKeyData, userPerformance, userScore) =>
                    setUserData(
                        userInfos.data.data.userInfos, 
                        userActivity.data.data.sessions,
                        userSessions.data.data.sessions,
                        userKeyData.data.data,
                        userPerformance.data.data,
                        userScore.data.data
                    )
               userApiService(dataRequest, dataFunctionCallback, setError)
            } else if(dataFrom === "mock"){
                setUserData(
                    USER_MAIN_DATA.filter(user => user.id === userId)[0].userInfos, 
                    USER_ACTIVITY.filter(session => session.userId === userId)[0].sessions,
                    USER_AVERAGE_SESSIONS.filter(session => session.userId === userId)[0].sessions,
                    USER_MAIN_DATA.filter(user => user.id === userId)[0].keyData,
                    USER_PERFORMANCE.filter(perf => perf.userId === userId)[0],
                    USER_MAIN_DATA.filter(user => user.id === userId)[0].todayScore
                )
            } else {
                console.error(
                    "in the absence of the dataFrom parameter, it is impossible to know where to retrieve the user's data !"
                )
                return setError(true) 
            }
        }
    }, [userId, dataFrom])
    
    return { isLoading, data, error }
}

export default UserInformationCollector