import React from "react";
import PropTypes from "prop-types"

import calorieIcon from "../../assets/calories_icon.png"
import glucidIcon from "../../assets/glucides_icon.png"
import lipidIcon from "../../assets/lipides_icon.png"
import proteinIcon from "../../assets/proteines_icon.png"


/**
 * display summary item
 * @param {string} name - summary item name
 * @param {number} value - summary item value
 * @returns {object} summary item dom element
 */
function summaryItem(name, value){
    let unit = "g"
    let srcImg
    switch(name){
        case "Calories" :
            srcImg = calorieIcon
            unit = "kCal"
            value = value.toFixed(3)
            break
        case "Glucides" :
            srcImg = glucidIcon
            break
        case "Lipides" :
            srcImg = lipidIcon
            break
        default :
            srcImg = proteinIcon
            break   
    }
    return(
        <div id={name.toLowerCase()} className="summaryItem">
            <div><img src={srcImg} alt="" /></div>
            <div>
                <p className="summary-item-value">{value}{unit}</p>
                <p>{name}</p>
            </div>
        </div>
    )
}

/**
 * component for displaying summary of user indicators
 * @component
 * @param {object} props 
 * @param {number} props.calorie - user calorie count
 * @param {number} props.protein - user protein count
 * @param {number} props.glucid - user glucid count
 * @param {number} props.lipid - user lipid count
 * @returns {object} section contain summary
 */
function Summary(props){
    const {calorie, glucid, lipid, protein} = props
    return(
        <section id="summary">
            {summaryItem("Calories", calorie/1000)}
            {summaryItem("Proteines", protein)}
            {summaryItem("Glucides", glucid)}
            {summaryItem("Lipides", lipid)}
        </section>
    )
}

summaryItem.propTypes = {
  name : PropTypes.string.isRequired,
  value : PropTypes.number.isRequired
}

Summary.propTypes = {
    calorie : PropTypes.number.isRequired, 
    protein : PropTypes.number.isRequired, 
    glucid : PropTypes.number.isRequired, 
    lipid : PropTypes.number.isRequired
}

export default Summary