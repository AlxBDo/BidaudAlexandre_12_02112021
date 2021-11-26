import PropTypes from "prop-types"

//EcmaScript 6 : POO (getter, setter)
// user object class
class user {

    activity
    averageSessions
    id
    keyData
    mainData
    performances
    todayScore

    /**
     * class representing an user 
     * @class
     * @classdesc retrieve and store user informations
     * 
     * @constructor
     * @param {number} id - user id
     * @param {object} data - contain user data 
     * @param {array} data.activity - array of objects containing user activity records
     * @param {object} data.keyData - contain counting indicators
     * @param {object} data.mainData - contain user main informations
     * @param {object} data.performances - contain attributes userId <number>, kind <object> and data <object>
     * @param {number} data.score - user activity score
     * @param {array} data.sessions - array of objects containing user sessions records 
     */
    constructor(id, data){
        if(!isNaN(id)){
            this.setId(id)
            this.setData(data)
        }
    }

    /**
     * provides user activity
     * @method
     * @memberof user
     * @returns {object} data in JSON format
     * @example return { day: '2020-07-01', kilogram: 80, calories: 240 }
     */
    getActivity(){ return this.activity }

    /**
     * provides user average sessions
     * @method
     * @memberof user
     * @returns {object} session - data in JSON format
     * @example return { day: 1, sessionLength: 30 }
     */
    getAverageSessions() { return this.averageSessions }

    /**
     * provides user calorie count
     * @method
     * @memberof user
     * @returns {number} calorie count
     */
    getCalorieCount(){ return this.keyData.calorieCount }

    /**
     * provides user carbohydrate count
     * @method
     * @memberof user
     * @returns {number} carbohydrate count
     */
    getCarbohydrateCount(){ return this.keyData.carbohydrateCount }

    /**
     * provides user performances
     * @method
     * @memberof user
     * @returns {object} performances - data in JSON format
     * @returns {number} performances.id - user id
     * @returns {object} performances.kind - { 1: 'cardio, 2: 'energy', 3: 'endurance', 4: 'strength', 5: 'speed', 6: 'intensity'}
     * @returns {array} performances.data - [ {value: 80, kind: 1}, ... ] 
     */
    getPerformances() { return this.performances }

    /**
     * provides user score
     * @method
     * @memberof user
     * @returns {number} - score
     * @example return 0.25
     */
    getScore() { return this.todayScore }

    /**
     * provides user first name
     * @method
     * @memberof user
     * @returns {string} user first name
     */
    getFirstName(){ return this.mainData.firstName }

    /**
     * provides user lipid count
     * @method
     * @memberof user
     * @returns {number} lipid count
     */
    getLipidCount(){ return this.keyData.lipidCount }

    /**
     * provides user protein count
     * @method
     * @memberof user
     * @returns {number} protein count
     */
    getProteinCount(){ return this.keyData.proteinCount }

    /**
     * modify the value of attributes activity, averageSessions, keyData, mainData, performances, todayScore
     * @method
     * @memberof user
     * @param {object} data - contain user data 
     */
    setData(data){
        this.activity = data.activity
        this.averageSessions = data.sessions 
        this.keyData = data.keyData
        this.mainData = data.mainData
        this.performances = data.performances 
        this.todayScore = data.score
    }

    /**
     * modify the value of the id attribute
     * @method
     * @memberof user
     * @param {number} id - user id 
     */
    setId(id){ if(!isNaN(id)){ this.id = parseInt(id) } }

}

user.PropTypes = {
    id : PropTypes.number.isRequired,
    data : PropTypes.object.isRequired
}

export default user