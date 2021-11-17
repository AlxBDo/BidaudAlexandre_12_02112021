import { Link } from "react-router-dom"

import { USER_MAIN_DATA } from "../../datas/data"

/**
 * Component for displaying home page main element
 * @component
 * @returns {object} main dom object
 */
function Home() {
    return(
        <main>
            <p>Bienvenue sur le site de test de SportSee</p>
            <p>Choisissez un utilisateur pour accéder à son profil</p>
            <ul>
                {USER_MAIN_DATA.map((user)=>(
                    <li key={user.id}>
                        <Link to={`/profil/${user.id}`}>{user.userInfos.firstName}</Link>
                    </li>
                ))}
            </ul>
        </main>
    )

}

export default Home