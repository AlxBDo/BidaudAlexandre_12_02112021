import { useState } from 'react'
import { Link } from "react-router-dom"

import userDataService from '../../services/userDataService'

/**
 * Component for displaying home page main element
 * @component
 * @returns {object} main html object
 */
function Home() {
    const [dataFrom, setDataFrom] = useState(false)
    return(
        <main>
            <p>Bienvenue sur le site de test de SportSee</p>
            <p>
                Les données de l'utilisateur seront collectées à partir : 
                <input 
                    type="radio" 
                    name="data-from" 
                    id="data-from-api"
                    value="api" 
                    checked={dataFrom} 
                    onChange={()=> setDataFrom(!dataFrom)} 
                />
                <label htmlFor="data-from-api">API</label> 
                <input 
                    type="radio" 
                    name="data-from" 
                    id="data-from-mock" 
                    value="mock" 
                    checked={!dataFrom} 
                    onChange={()=> setDataFrom(!dataFrom)} 
                />
                <label htmlFor="data-from-mock">Mock</label>
            </p>
            <p>Choisissez un utilisateur pour accéder à son profil</p>
            <ul>
                {userDataService.getUsersMocked().map((user)=>(
                    <li key={user.id}>
                        <Link to={`/profil/${user.id}/${dataFrom ? "api" : "mock"}`}>{user.userInfos.firstName}</Link>
                    </li>
                ))}
            </ul>
        </main>
    )

}

export default Home