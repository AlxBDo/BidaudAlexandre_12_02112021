import PropTypes from "prop-types"

import { USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_MAIN_DATA, USER_PERFORMANCE } from "../datas/data"

/** 
 * class representing an user 
 * @class
 * @classdesc retrieve and store user information
 */
export default class user {

    activity
    averageSessions
    id
    keyData
    mainData
    performances
    todayScore

    /**
     * @constructor
     * @param {number} id - user id 
     */
    constructor(id){
        if(this.setId(id)){ this.getData() }
    }

    /**
     * provides user activity
     * @returns {object} data in JSON format
     * @example return { day: '2020-07-01', kilogram: 80, calories: 240 }
     */
    getActivity(){ return this.activity }

    /**
     * provides user average sessions
     * @returns {object} session - data in JSON format
     * @example return { day: 1, sessionLength: 30 }
     */
    getAverageSessions() { return this.averageSessions }

    /**
     * provides user calorie count
     * @returns {number} calorie count
     */
    getCalorieCount(){ return this.keyData.calorieCount }

    /**
     * provides user carbohydrate count
     * @returns {number} carbohydrate count
     */
    getCarbohydrateCount(){ return this.keyData.carbohydrateCount }

    /**
     * provides user performances
     * @returns {object} performances - data in JSON format
     * @returns {number} performances.id - user id
     * @returns {object} performances.kind - { 1: 'cardio, 2: 'energy', 3: 'endurance', 4: 'strength', 5: 'speed', 6: 'intensity'}
     * @returns {array} performances.data - [ {value: 80, kind: 1}, ... ] 
     */
    getPerformances() { return this.performances }

    /**
     * provides user score
     * @returns {number} - score
     * @example return 0.25
     */
    getScore() { return this.todayScore }

    /**
     * retrieves and stores user data
     */
    getData(){
        this.activity = USER_ACTIVITY.filter(session => session.userId === this.id)[0].sessions
        this.averageSessions = USER_AVERAGE_SESSIONS.filter(session => session.userId === this.id)[0].sessions 
        this.keyData = USER_MAIN_DATA.filter(user => user.id === this.id)[0].keyData
        this.mainData = USER_MAIN_DATA.filter(user => user.id === this.id)[0].userInfos
        this.performances = USER_PERFORMANCE.filter(perf => perf.userId === this.id)[0] 
        this.todayScore = USER_MAIN_DATA.filter(user => user.id === this.id)[0].todayScore
    }

    /**
     * provides user first name
     * @returns {string} user first name
     */
    getFirstName(){ return this.mainData.firstName }

    /**
     * provides user lipid count
     * @returns {number} lipid count
     */
    getLipidCount(){ return this.keyData.lipidCount }

    /**
     * provides user protein count
     * @returns {number} protein count
     */
    getProteinCount(){ return this.keyData.proteinCount }


    /**
     * store user id
     * @param {number} id - user id 
     * @returns {boolean} true : paramater is in correct format
     */
    setId(id){ 
        if(!isNaN(id)){ 
            this.id = parseInt(id) 
            return true
        } else { 
            console.error("ID USER must be number !")
            return false
        }
    }

}

user.PropTypes = {
    id : PropTypes.number.isRequired
}
