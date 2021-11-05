import React from "react";

import calorieIcon from "../assets/calories_icon.png"
import glucidIcon from "../assets/glucides_icon.png"
import lipidIcon from "../assets/lipides_icon.png"
import proteinIcon from "../assets/proteines_icon.png"

function summaryItem(name, value){
    let unit = "g"
    let srcImg
    switch(name){
        case "Calories" :
            srcImg = calorieIcon
            unit = "kCal"
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


function Summary(props){
    const {calorie, glucid, lipid, protein} = props
    return(
        <section id="summary">
            {summaryItem("Calories", calorie)}
            {summaryItem("Proteines", protein)}
            {summaryItem("Glucides", glucid)}
            {summaryItem("Lipides", lipid)}
        </section>
    )
}

export default Summary