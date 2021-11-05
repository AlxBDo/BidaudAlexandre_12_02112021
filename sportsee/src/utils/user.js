import { USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_MAIN_DATA, USER_PERFORMANCE } from "../datas/data"

export default class user {

    activity
    averageSession
    id
    mainData
    performances

    constructor(id){
        if(this.setId(id)){ this.getData() }
    }

    getActivity(){ return this.activity }

    getData(){
        this.activity = USER_ACTIVITY.filter(session => session.userId === this.id)[0].sessions
        this.averageSession = USER_AVERAGE_SESSIONS.filter(session => session.userId === this.id)[0].sessions
        this.mainData = USER_MAIN_DATA.filter(user => user.id === this.id)[0].userInfos
        this.performances = USER_PERFORMANCE.filter(perf => perf.userId === this.id)[0]
    }

    getFirstName(){ return this.mainData.firstName }


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
