import { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import BodyBuldingImg from '../../assets/bodybulding.png';
import CyclingImg from '../../assets/cycling.png';
import RelaxationImg from '../../assets/relaxation.png';
import swimingImg from '../../assets/swiming.png';


const MenuLink = styled(Link)`
    ${(props) => (`background-image: url(${props.$urlBg});`) }
    width: 64px;
    height: 64px;
    display: block;
    background-repeat: no-repeat;
    background-position: center center;
    background-color: white;
    margin: 25% auto;
    border-radius: 5px;
`

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

class PageMenu extends Component {

    BodyBuldingSrcLink = "/Bodybulding"
    CyclingSrcLink = "/Cycling"
    RelaxationSrcLink = "/Relaxation"
    swimingSrcLink = "/swiming"

    getLink(srcLink){
        let nameLink = "Musculation"
        let bgUrl = BodyBuldingImg
        switch(srcLink){
            case this.BodyBuldingSrcLink :
                break
            case this.CyclingSrcLink :
                nameLink = "Cyclisme"
                bgUrl = CyclingImg
                break
            case this.RelaxationSrcLink :
                nameLink = "Relaxation"
                bgUrl = RelaxationImg
                break
            case this.swimingSrcLink :
                nameLink = "Natation"
                bgUrl = swimingImg
                break
            default :
                console.error("Source link isn't defined in PageMenu Link !")
                break
        }
        return(
            <MenuLink to={srcLink} alt={nameLink} $urlBg={bgUrl}></MenuLink>
        )
    }

    render(){
        const bodybuldingMenu = this.getLink(this.BodyBuldingSrcLink)
        const cyclingMenu = this.getLink(this.CyclingSrcLink)
        const relaxationMenu = this.getLink(this.RelaxationSrcLink)
        const swimingMenu = this.getLink(this.swimingSrcLink)
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
}

export default PageMenu