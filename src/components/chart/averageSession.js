import * as d3 from "d3";
import PropTypes from "prop-types"

addTooltip.propTypes = {
    svg : PropTypes.object.isRequired
}

/**
 * create tooltip to display curve informations
 * @param {object} svg - svg dom object 
 * @returns {object} tooltip svg group
 */
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

/**
 * generate user's average sessions chart
 * @param {array} data - array of objects with day and sessionLength attributes
 * @param {number} height - chart height 
 * @param {object} svg - svg contains chart
 * @param {number} width - chart width
 * @param {object} [margin] - contains attributes : marginTop, marginRight, marginBottom, marginLeft
 */
function averageSessions( data, height, svg, width, margin ){
  const chartTitle = ["Durée moyenne des", "sessions"]
    svg.attr("transform", `translate(${-width/9}, 0)`);
      
    // data preparation
    let days = ["s", "L", "M", "M ", "J", "V", "S", "D", "e"]
    let xCoords = days.map((d, i) => i * width/7);

    let dataModified = []
    data.forEach((d, i) => {
      if(d.day === 1){
        dataModified.push({
          day: "start", 
          sessionLength: d.sessionLength/2
        })
      }
      dataModified.push({day: d.day, sessionLength: d.sessionLength})
      if(d.day === 7){
        dataModified.push({day: "end", sessionLength: d.sessionLength/2})
      }
    })

    const x = d3.scaleOrdinal().domain(days).range(xCoords);
    const y = d3.scaleLinear()
      .domain(d3.extent(dataModified, d => d.sessionLength))
      .range([parseInt(height*0.9), parseInt(height*0.3)]);


    // Draw the lines
    const line = d3.line()
      .x((d) => x(d.day))
      .y((d) => y(d.sessionLength))
      .curve(d3.curveCatmullRom);

    // Add axis
    svg.append("g")
        .attr("transform", `translate(0, ${height*0.9})`)
        .call(d3.axisBottom(x))
        .attr("stroke-width", 0)
        .style("color", "rgba(255, 255, 255, 0.6)")
        .style("font-size", "small")
        .style("font-weight", "bold")
        .style("text-align", "center");
    
    // Add path to calculate line function
    svg.append("path")
        .datum(dataModified)
        .attr("class", "line")
        .attr("d", line)
        .attr("stroke", "white")
        .attr("stroke-width", 2)
        .attr("fill", "none");
    
    svg.append("rect")
    .attr("class", "overlayBackground")
    .attr("width", width*0.94)
    .attr("height", height)
    .attr("opacity", 0.15)
    .attr("y", 0)
    .attr("transform", `translate(${width/9}, 0)`);

    const tooltip = addTooltip(svg)
    
    svg.append("rect")
    .attr("class", "overlay")
    .attr("width", (width/7)*9)
    .attr("height", height)
    .attr("fill", "transparent")
    .style("overflow", "hidden")
    .on("mouseover", function(event) { 
        tooltip.style("display", null);
    })
    .on("mouseout", function(event) {
        tooltip.style("display", "none");
    })
    .on("mousemove", mousemove);

    function mousemove(event){
      let position = d3.pointer(event)[0]
      let xSlice = width/7
      let i = parseInt(position/xSlice)
      let d = dataModified[i]
      d3.select('.overlayBackground').attr("transform", `translate(${position}, 0)`)
      if(i >= dataModified.length){ 
        i = 8
        d = dataModified[i] 
      }
      if(i >= 0) {
        let xTenthSlice = xSlice /10
        let startPosition = (i * xSlice)
        let yPosition = y(d.sessionLength)
        if(i <= 8){
          let countQuarterSlice = (positionInSlice) => { 
            for(let i = 1; i <= 10; i++){ if((i*xTenthSlice)>positionInSlice){ return (i-1)*0.1 } } }
          yPosition += (y(dataModified[i+1].sessionLength) - yPosition) * countQuarterSlice(position - startPosition)
        }
        tooltip.attr("transform", "translate(" +position + "," + yPosition + ")");
          d3.select('#tooltip-close')
              .text(d.sessionLength + " min");
      }
    }

    let titlePath = svg.append("text").attr("fill", "white").attr("opacity", 0.5)
    .style("color", "white").style("font-size", width < 250 ? "small" : "medium")
    titlePath.append("tspan").text(chartTitle[0]).attr("y", 30).attr("x", 50)
    titlePath.append("tspan").text(chartTitle[1]).attr("x", 50).attr("dy", "1.5em")
}

export default averageSessions;