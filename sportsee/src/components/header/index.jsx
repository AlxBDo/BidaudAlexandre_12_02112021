import { Link } from "react-router-dom";
import styled from "styled-components";

import LogoImg from '../../assets/logo.svg'

const HeaderStyled = styled.header`
    background-color: black;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const LiNav = styled.li`
    list-style: none;
    display: inline-block;
`

const LinkNav = styled(Link)`
    font-size : x-large;
    color: white;
`

const NavStyled = styled.nav`
    width: 70%;
    display: flex;
    justify-content: space-around;
`

/**
 * Component for displaying header page. 
 * header containt logo and navigation
 * @component
 * @returns {object} HeaderStyled - styled component
 */
function Header(){
    return(
        <HeaderStyled>
            <img src={LogoImg} alt="SportSee" />
            <NavStyled>
                <LiNav>
                    <LinkNav to="/">Accueil</LinkNav>
                </LiNav>
                <LiNav>
                    <LinkNav to="/Profil">Profil</LinkNav>
                </LiNav>
                <LiNav>
                    <LinkNav to="/Settings">Réglage</LinkNav>
                </LiNav>
                <LiNav>
                    <LinkNav to="/Community">Communauté</LinkNav>
                </LiNav>
            </NavStyled>
        </HeaderStyled>
    )
}

export default Header