import styled from "styled-components";

import { linkGenerator } from "./linkGenerator";

const MenuP = styled.p`
    transform: rotate(-90deg);
    color: white;
    width: 200px;
    white-space: nowrap;
    margin: 100px 1% 120px;
    font-size: small;
`

const MenuSection = styled.section`
    background-color: black;
    flex-direction: column;
    align-items: center;
    position: absolute;
    bottom: 0;
    width: 8.33%;
    min-width: 100px;
    justify-content: flex-end;
    top: 70px;
    height: 100%
`
/**
 * Component for displaying lateral page menu
 * @component
 * @returns {object} MenuSection - styled component
 */
function PageMenu() {

    const [bodybuldingMenu, cyclingMenu, relaxationMenu, swimingMenu] = linkGenerator.getLinks()
    
    return(
        <MenuSection className="flex">
            <nav>
                <li>{relaxationMenu}</li>
                <li>{swimingMenu}</li>
                <li>{cyclingMenu}</li>
                <li>{bodybuldingMenu}</li>
            </nav>
            <MenuP>Copiryght, SportSee 2020</MenuP>
        </MenuSection>
    )
}

export default PageMenu