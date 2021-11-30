import React from "react";
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import useUserService from "../../utils/useUserService.jsx";
import user from "../../models/user.js"
import Chart from "../../components/chart";
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
 * @param {string} dataFrom - data source : api or mock
 * @returns {object} main dom object
 */
function Profil() {
    const { idUser, dataFrom } = useParams()
    const { data, isLoading, error } = useUserService(parseInt(idUser), dataFrom)
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
                    <h1>Bonjour <span>{userObj.getFirstName()}</span></h1>
                    <p>Félicitation ! Vous avez explosé vos objectifs hier 👏 </p>
                    <div id="dashboard">
                        <section id="graph">
                            <Chart name="dailyActivity" data={userObj.getActivity()} />
                            <Chart name="averageSessions" data={userObj.getAverageSessions()} />
                            <Chart name="performances" data={userObj.getPerformances()} />
                            <Chart name="score" data={userObj.getScore()} />
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