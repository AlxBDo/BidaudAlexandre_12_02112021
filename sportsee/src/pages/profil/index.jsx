import { useParams } from 'react-router-dom'

import user from "../../utils/user.js"
import DailyActivityGraph from '../../views/dailyActivityGraph.js';

const dimensions = {
    width: 835,
    height: 320,
    margin: { top: 30, right: 30, bottom: 30, left: 60 }
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
                <section id="summary">
                    
                </section>
            </div>
        </main>
    )

}

export default Profil