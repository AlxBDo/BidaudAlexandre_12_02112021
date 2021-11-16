import PropTypes from "prop-types"

function addTooltip(svg) {
    // Création d'un groupe qui contiendra tout le tooltip plus le cercle de suivi
    var tooltip = svg.append("g")
        .attr("id", "tooltip")
        .style("display", "none");
  
    // Le cercle intérieur bleu foncé
    tooltip.append("circle")
        .attr("fill", "white")
        .attr("stroke", "#fff")
        .attr("r", 4);
    
    // Le tooltip en lui-même 
    // Il faut le dimensionner en fonction du contenu
    tooltip.append("rect")
        .attr("width","40")
        .attr("height","25")
        .style("fill", "white")
        .attr("transform", "translate(-20, -55)");
    
    // Cet élément contiendra tout notre texte
    var text = tooltip.append("text")
        .style("font-size", "10px")
        .style("font-family", "Segoe UI")
        .style("color", "#333333")
        .style("fill", "#333333")
        .attr("transform", "translate(-15, -40)");
    
    // Element pour la date avec positionnement spécifique
    text.append("tspan")
        .attr("dx", "-5")
        .attr("id", "tooltip-date");
    
    // Le texte "Cours : "
    text.append("tspan")
        .attr("dx", "5");
    
    // Le texte pour la valeur de l'or à la date sélectionnée
    text.append("tspan")
        .attr("id", "tooltip-close")
        .style("font-weight", "bold");
    
    return tooltip;
}  

addTooltip.propTypes = {
    svg : PropTypes.object.isRequired
}

export default addTooltip