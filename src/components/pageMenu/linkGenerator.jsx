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

/**
 * generate pageMenu links
 */
export const linkGenerator = {

    BodyBuldingSrcLink : "/Bodybulding",
    CyclingSrcLink : "/Cycling",
    RelaxationSrcLink : "/Relaxation",
    swimingSrcLink : "/swiming",

    /**
     * complete and generate MenuLink
     * @param {string} srcLink - route path
     * @returns {object} MenuLink - styled component
     */
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
        return(<MenuLink to={srcLink} alt={nameLink} $urlBg={bgUrl}></MenuLink>)
    },

    /**
     * generate all necessary MenuLink to the PageMenu
     * @returns {array} contain MenuLink
     */
    getLinks(){
        return [
            this.getLink(this.BodyBuldingSrcLink), 
            this.getLink(this.CyclingSrcLink), 
            this.getLink(this.RelaxationSrcLink), 
            this.getLink(this.swimingSrcLink)
        ] 
    }
    
}