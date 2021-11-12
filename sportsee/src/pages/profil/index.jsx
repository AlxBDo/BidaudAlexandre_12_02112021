import { useParams } from 'react-router-dom'

import user from "../../utils/user.js"
import DailyActivityGraph from '../../components/dailyActivityGraph';
import AverageSessionsChart from '../../components/averageSessionsChart/index.jsx';
import PerformancesChart from '../../components/performancesChart';
import ScoreChart from '../../components/scoreChart';
import Summary from '../../components/summary';


function Profil() {
    const { idUser } = useParams()
    const userObj = new user(idUser)

    return(
        <main>
            <h1>Bonjour <span>{userObj.getFirstName()}</span></h1>
            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏 </p>
            <div id="dashboard">
                <section id="graph">
                    <DailyActivityGraph data= {userObj.getActivity()} />
                    <AverageSessionsChart data={ userObj.getAverageSessions() } />
                    <PerformancesChart data={ userObj.getPerformances() } />
                    <ScoreChart data={ userObj.getScore() } />
                </section>
                <Summary 
                    calorie={userObj.getCalorieCount()} 
                    glucid={userObj.getCarbohydrateCount()} 
                    lipid={userObj.getLipidCount()} 
                    protein={userObj.getProteinCount()} 
                />
            </div>
        </main>
    )

}

export default Profil