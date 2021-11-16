import PropTypes from "prop-types"

import { USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_MAIN_DATA, USER_PERFORMANCE } from "../datas/data"

export default class user {

    activity
    averageSessions
    id
    keyData
    mainData
    performances
    todayScore

    constructor(id){
        if(this.setId(id)){ this.getData() }
    }

    getActivity(){ return this.activity }

    getAverageSessions() { return this.averageSessions }

    getCalorieCount(){ return this.keyData.calorieCount }

    getCarbohydrateCount(){ return this.keyData.carbohydrateCount }

    getPerformances() { return this.performances }

    getScore() { return this.todayScore }

    getData(){
        this.activity = USER_ACTIVITY.filter(session => session.userId === this.id)[0].sessions
        this.averageSessions = USER_AVERAGE_SESSIONS.filter(session => session.userId === this.id)[0].sessions 
        this.keyData = USER_MAIN_DATA.filter(user => user.id === this.id)[0].keyData
        this.mainData = USER_MAIN_DATA.filter(user => user.id === this.id)[0].userInfos
        this.performances = USER_PERFORMANCE.filter(perf => perf.userId === this.id)[0] 
        this.todayScore = USER_MAIN_DATA.filter(user => user.id === this.id)[0].todayScore
    }

    getFirstName(){ return this.mainData.firstName }

    getLipidCount(){ return this.keyData.lipidCount }

    getProteinCount(){ return this.keyData.proteinCount }


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
