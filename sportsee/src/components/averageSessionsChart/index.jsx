import React from "react";

import * as d3 from "d3";

import chartDimensions from "../../utils/chartDimensions";
import {GraphicContainer}  from "../../utils/style";


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
 
const AverageSessionsChart = ({ data }) => {
  const backgroundColor = "#F00"
  const chartTitle = ["Durée moyenne des", "sessions"]
  const containerWidth = 31
  const svgRef = React.useRef(null);
  const { width, height, margin } = chartDimensions.calculate((0.9*0.7*0.3), 285);
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;
 
  React.useEffect(() => {
    // Create root container where we will append all other chart elements
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove(); // Clear svg content before adding new elements 
    const svg = svgEl
      .append("g")
      .attr("transform", `translate(0,${margin.top})`);
      
    // Séparation sur l'axe horizontal entre chaque essaim
    let days = ["L", "M", "M ", "J", "V", "S", "D"]
    let xCoords = days.map((d, i) => i * width/7);
    
    const x = d3.scaleOrdinal().domain(days).range(xCoords);
  
    const y = d3.scaleLinear()
      .range([height, 50]);

    y.domain(d3.extent(data, d => d.sessionLength));

    // Draw the lines
    const line = d3.line()
      .x((d) => x(d.day))
      .y((d) => y(d.sessionLength))
      .curve(d3.curveBasis);

    // Ajout de l'axe X
    svg.append("g")
        .attr("transform", "translate(10," + (height+15) + ")")
        .call(d3.axisBottom(x))
        .attr("stroke-width", 0)
        .style("color", "rgba(255, 255, 255, 0.6)")
        .style("font-size", "small")
        .style("font-weight", "bold")
        .style("text-align", "center");
    
    // Ajout d'un path calculé par la fonction line à partir des données de notre fichier.
    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line)
        .attr("stroke", "white")
        .attr("stroke-width", 2)
        .attr("fill", "none")
        .attr("transform", "translate(1.5, 0) scale(1.1, 1)");

    const mousemove = (event) => {
      let position = d3.pointer(event)[0]
      x.invert = foo => xCoords[(parseInt(foo/((width-(150-(position*0.3)))/7)))]
      let bisecDay = d3.bisector(d => xCoords[d.day]).left
      let x0 = x.invert(position),
      i = bisecDay(data, x0),
      d = data[i];
      d3.select('.overlayBackground').attr("transform", `translate(${position}, 0)`)
      if(i >= data.length){ d = data[6] }
      if(i >= 0) {
        tooltip.attr("transform", "translate(" +position + "," + y(d.sessionLength) + ")");
          d3.select('#tooltip-close')
              .text(d.sessionLength + " min");
      }
    }
    
    svg.append("rect")
    .attr("class", "overlayBackground")
    .attr("width", width)
    .attr("height", svgHeight+50)
    .attr("opacity", 0.15)
    .attr("y", -50)

    const tooltip = addTooltip(svg)
    
    svg.append("rect")
    .attr("class", "overlay")
    .attr("width", width)
    .attr("height", svgHeight)
    .attr("fill", "transparent")
    .on("mouseover", function(event) { 
        tooltip.style("display", null);
    })
    .on("mouseout", function(event) {
        tooltip.style("display", "none");
    })
    .on("mousemove", mousemove);

    let titlePath = svg.append("text").attr("fill", "white").style("color", "white").attr("opacity", 0.5)
    titlePath.append("tspan").text(chartTitle[0]).attr("y", 20).attr("x", 30)
    titlePath.append("tspan").text(chartTitle[1]).attr("x", 30).attr("dy", "1.95em")

  }, [data, svgHeight, width, height, margin.left, margin.right, margin.top]); // Redraw chart if data changes
 
  return (
    <GraphicContainer id="average-sessions-graph" $bgColor={backgroundColor} $width={containerWidth}>
        <svg ref={svgRef} width={svgWidth} height={svgHeight} />
    </GraphicContainer>
  )
};
 
export default AverageSessionsChart;