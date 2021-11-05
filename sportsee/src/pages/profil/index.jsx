import { useParams } from 'react-router-dom'

import user from "../../utils/user.js"
import DailyActivityGraph from '../../views/dailyActivityGraph.js';
import Summary from '../../views/summary.jsx';

const dimensions = {
    width: 835,
    height: 320,
    margin: { top: 5, right: 50, bottom: 5, left: 50 }
  }


function Profil() {
    const { idUser } = useParams()
    const userObj = new user(idUser)

    return(
        <main>
            <h1>Bonjour <span>{userObj.getFirstName()}</span></h1>
            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏 </p>
            <div id="dashboard">
                <section id="graph">
                    <DailyActivityGraph data= {userObj.getActivity()} dimensions={dimensions} />
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