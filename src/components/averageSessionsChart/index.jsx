import React from "react";
import * as d3 from "d3";
import PropTypes from "prop-types"

import {GraphicContainer}  from "../../utils/style";
import addTooltip from "./addTooltip";


/**
 * generate user's average sessions chart
 * @component
 * @param {array} data - array of objects with day and sessionLength attributes
 * @returns {object} GraphicContainer - styled component
 */
function AverageSessionsChart({ data, dimensions }){
  const backgroundColor = "#F00"
  const containerWidth = 31
  const svgRef = React.useRef(null);
  const { width, height, margin } = dimensions.calculate((0.9*0.7*0.31), "width");
 
  React.useEffect(() => {
    const chartTitle = ["Durée moyenne des", "sessions"]
    // Create root container where we will append all other chart elements
    const svgEl = d3.select(svgRef.current);
    const svg = svgEl
      .append("g")
      .attr("transform", `translate(${-width/9}, 0)`);
      
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

    let titlePath = svg.append("text").attr("fill", "white").style("color", "white").attr("opacity", 0.5)
    titlePath.append("tspan").text(chartTitle[0]).attr("y", 20).attr("x", 50)
    titlePath.append("tspan").text(chartTitle[1]).attr("x", 50).attr("dy", "1.95em")

  }, [data, width, height, margin]); // Redraw chart if data changes
 
  return (
    <GraphicContainer id="average-sessions-graph" $bgColor={backgroundColor} $width={containerWidth}>
        <svg ref={svgRef} width={width} height={height} />
    </GraphicContainer>
  )
};

AverageSessionsChart.propTypes = {
  data : PropTypes.array.isRequired
}

export default AverageSessionsChart;