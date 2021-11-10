import React from "react";

import * as d3 from "d3";

import chartDimensions from "../utils/chartDimensions";
import {GraphicContainer}  from "../utils/style";


function addTooltip(svg) {
  // Création d'un groupe qui contiendra tout le tooltip plus le cercle de suivi
  var tooltip = svg.append("g")
      .attr("id", "tooltip")
      .style("display", "none");
  
  // Le cercle extérieur bleu clair
  tooltip.append("circle")
      .attr("fill", "#CCE5F6")
      .attr("r", 10);

  // Le cercle intérieur bleu foncé
  tooltip.append("circle")
      .attr("fill", "#3498db")
      .attr("stroke", "#fff")
      .attr("stroke-width", "1.5px")
      .attr("r", 4);
  
  // Le tooltip en lui-même avec sa pointe vers le bas
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
 
const AverageSessionsChart = ({ data }) => {
  const backgroundColor = "#F00"
  const containerWidth = 31
  const svgRef = React.useRef(null);
  const { width, height, margin } = chartDimensions.calculate(0.15, 285, 25, 0, 25, 0);
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;
 
  React.useEffect(() => {
    // Create root container where we will append all other chart elements
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove(); // Clear svg content before adding new elements 
    const svg = svgEl
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
      
    let days = ["L", "M", "M ", "J", "V", "S", "D"]

    // Séparation sur l'axe horizontal entre chaque essaim
    let xCoords = days.map((d, i) => i * width/7);
    
    const x = d3.scaleOrdinal().domain(days).range(xCoords);
  
    const y = d3.scaleLinear()
      .range([height-15, 0]);

    y.domain(d3.extent(data, d => d.sessionLength));

    // Draw the lines
    const line = d3.line()
      .x((d) => x(d.day))
      .y((d) => y(d.sessionLength))
      .curve(d3.curveBasis);

    // Ajout de l'axe X
    svg.append("g")
        .attr("transform", "translate("+ width/28 +"," + height + ") scale(0.95, 1)")
        .call(d3.axisBottom(x))
        .attr("stroke-width", 0)
        .style("color", "rgba(255, 255, 255, 0.6)")
        .style("font-size", "small")
        .style("font-weight", "bold");

    const tooltip = addTooltip(svg)

    const mousemove = (event) => {
      let bisecDay = d3.bisector(d => xCoords[d.day]).left
      var x0 = x(d3.pointer(event)[0]),
      i = bisecDay(data, x0),
      d = data[i];
      if(i >= 0 && i < data.length) {
        let previousLocation = parseInt(d3.select('#tooltip-date').text().substring(5))
        if(!isNaN(previousLocation) && (previousLocation+1) !== i && (previousLocation-1) !== i){
          if(i > previousLocation){
            previousLocation = previousLocation < (data.length - 1) ? (previousLocation + 1) : 0  
          } else {
            previousLocation = previousLocation > 0 ? (previousLocation-1) : data.length
          }
          d = data[i]
        }
        tooltip.attr("transform", "translate(" + x(d.day) + "," + y(d.sessionLength) + ")");
        d3.select('#tooltip-close')
            .text(d.sessionLength + " min");
      }
      
    }
    
    svg.append("rect")
    .attr("class", "overlay")
    .attr("width", width)
    .attr("height", svgHeight)
    .attr("opacity", 0.25)
    .on("mouseover", function(event) { 
        tooltip.style("display", null);
    })
    .on("mouseout", function(event) {
        tooltip.style("display", "none");
    })
    .on("mousemove", mousemove);
    
    // Ajout d'un path calculé par la fonction line à partir des données de notre fichier.
    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line)
        .attr("stroke", "white")
        .attr("fill", "none");

  }, [data, svgHeight, width, height, margin.left, margin.right, margin.top]); // Redraw chart if data changes
 
  return (
    <GraphicContainer id="average-sessions-graph" $bgColor={backgroundColor} $width={containerWidth}>
        <svg ref={svgRef} width={svgWidth} height={svgHeight} />
    </GraphicContainer>
  )
};
 
export default AverageSessionsChart;