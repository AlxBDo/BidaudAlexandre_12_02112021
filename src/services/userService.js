import { USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_MAIN_DATA, USER_PERFORMANCE } from "../datas/data"

/**
 * base of the url to access the user api
 */
const baseUrlApi = `http://localhost:3000/user`

/**
 * urls array used to retrieve user data from the API
 * @function
 * @param {number} userId - identifier of the user whose data is to be recovered
 * @returns {array} api urls array
 */
const getByIdApiRequest = userId => {
    return  [
        `${baseUrlApi}/${userId}`, 
        `${baseUrlApi}/${userId}/activity`, 
        `${baseUrlApi}/${userId}/average-sessions`, 
        `${baseUrlApi}/${userId}/key-data`, 
        `${baseUrlApi}/${userId}/performance`, 
        `${baseUrlApi}/${userId}/today-score` 
    ]
}

/**
 * retrieves user data mocked
 * @function
 * @param {number} userId - user identifier
 */
const getByIdMocked = userId => getDataObject(
    USER_MAIN_DATA.filter(user => user.id === userId)[0].userInfos, 
    USER_ACTIVITY.filter(session => session.userId === userId)[0].sessions,
    USER_AVERAGE_SESSIONS.filter(session => session.userId === userId)[0].sessions,
    USER_MAIN_DATA.filter(user => user.id === userId)[0].keyData,
    USER_PERFORMANCE.filter(perf => perf.userId === userId)[0],
    USER_MAIN_DATA.filter(user => user.id === userId)[0].todayScore
)

/**
 * groups the collected data into an object
 * @function
 * @param {object} userInfos 
 * @param {object} userActivity 
 * @param {pbject} userSessions 
 * @param {object} userKeyData 
 * @param {object} userPerformance 
 * @param {object} userScore 
 * @returns {object} user data object = { mainData, activity, sessions, keyData, performances, score }
 */
const getDataObject = (userInfos, userActivity, userSessions, userKeyData, userPerformance, userScore) => {
    return {
        mainData: userInfos, 
        activity: userActivity,
        sessions: userSessions,
        keyData: userKeyData,
        performances: userPerformance,
        score: userScore
    }
}

/**
 * retrieves user data model
 * @function
 * @param {object} userInfos 
 * @param {object} userActivity 
 * @param {pbject} userSessions 
 * @param {object} userKeyData 
 * @param {object} userPerformance 
 * @param {object} userScore 
 * @returns {object} dataObject - cf getDataObject() function
 */
const getDataObjectApi = (userInfos, userActivity, userSessions, userKeyData, userPerformance, userScore) => {
    return getDataObject(
        userInfos.data.data.userInfos, 
        userActivity.data.data.sessions,
        userSessions.data.data.sessions,
        userKeyData.data.data,
        userPerformance.data.data,
        userScore.data.data
    )
}

/**
 * object containing user data collection functions
 */
const userService = {
    getByIdApiRequest,
    getByIdMocked,
    getDataObjectApi,
    getUsersMocked : () => { return USER_MAIN_DATA }
}

export default userService