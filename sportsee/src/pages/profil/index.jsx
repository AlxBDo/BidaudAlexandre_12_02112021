import { useParams } from 'react-router-dom'

import user from "../../utils/user.js"
import DailyActivityGraph from '../../views/dailyActivityGraph.js';
import AverageSessionsChart from '../../views/averageSessionsChart.jsx';
import PerformancesChart from '../../views/performancesChart.jsx';
import ScoreChart from '../../views/scoreChart.jsx';
import Summary from '../../views/summary.jsx';


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