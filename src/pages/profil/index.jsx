import React from "react";
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import UserInformationCollector from '../../utils/hooks'
import user from "../../utils/user.js"
import chartDimensions from "../../utils/chartDimensions";
import DailyActivityGraph from '../../components/dailyActivityGraph';
import AverageSessionsChart from '../../components/averageSessionsChart/index.jsx';
import PerformancesChart from '../../components/performancesChart';
import ScoreChart from '../../components/scoreChart';
import Summary from '../../components/summary';

const ErrorMessage = styled.div`
    color: #FF0101;
    font-size: x-large;
    font-weight: 700;
    text-align: center;
    margin: 20% auto 12%;
    max-width: 50%;
    line-height: 1.5em;
`
const LoadingMessage = styled.div`
    color: #FF0101;
    font-size: x-large;
    font-weight: 500;
    text-align: center;
    margin: 20% auto 12%;
`

const LoadingIcon = styled.p`
    border: 10px solid #FF0101;
	height: 50px;
	width: 50px;
	border-radius: 100px;
	border-bottom-color: transparent;
	animation: loading 700ms linear infinite;
    margin: 15% auto;
`

/**
 * Component for displaying user activity dashboard
 * @component
 * @param {number} idUser - user id 
 * @returns {object} main dom object
 */
function Profil() {
    const { idUser } = useParams()
    const { data, isLoading, error } = UserInformationCollector(idUser)
    const userObj = new user(idUser, data)  
    return(
        <main>
            {error ? (
                <ErrorMessage>
                    Nous rencontrons un problème dans la récupération de vos informations 😵.
                    <p>Veuillez nous excusez pour le désagrement.</p>
                </ErrorMessage>
            ) : isLoading ? (
                <LoadingMessage className="loading-data">
                    Merci de patienter un instant, nous récupérons vos informations.
                    <LoadingIcon> </LoadingIcon>
                </LoadingMessage>
            ) : (
                <div>
                    <h1>Bonjour {!isLoading ? (<span>{userObj.getFirstName()}</span>) : null}</h1>
                    <p>Félicitation ! Vous avez explosé vos objectifs hier 👏 </p>
                    <div id="dashboard">
                        <section id="graph">
                            <DailyActivityGraph data= {userObj.getActivity()} dimensions={chartDimensions} />
                            <AverageSessionsChart data={userObj.getAverageSessions()} dimensions={chartDimensions} />
                            <PerformancesChart data={userObj.getPerformances()} dimensions={chartDimensions} />
                            <ScoreChart data={userObj.getScore()} dimensions={chartDimensions} />
                        </section>
                        <Summary 
                            calorie={userObj.getCalorieCount()} 
                            glucid={userObj.getCarbohydrateCount()} 
                            lipid={userObj.getLipidCount()} 
                            protein={userObj.getProteinCount()} 
                        />
                    </div>
                </div>
            ) }
        </main>
    )

}

export default Profil