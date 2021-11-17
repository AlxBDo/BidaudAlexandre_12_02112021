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
      .attr("transform", `translate(0,${margin.top})`);
      
    // data preparation
    let days = ["start", "L", "La", "M", "Ma", "M ", "Mea", "J", "Ja", "V", "Va", "S", "Sa", "D", "end"]
    let xCoords = days.map((d, i) => i * width/14);

    let averageData = []
    data.forEach((d, i) => {
      if(d.day === 1){
        averageData.push({
          day: "start", 
          sessionLength: d.sessionLength/2
        })
      } else {
        averageData.push({
          day: `average${i-1}`, 
          sessionLength: (d.sessionLength + data[i-1].sessionLength)/2
        })
      }
      averageData.push({day: d.day, sessionLength: d.sessionLength})
      if(d.day === 7){
        averageData.push({day: "end", sessionLength: d.sessionLength/2})
      }
    })

    const x = d3.scaleOrdinal().domain(days).range(xCoords);
    const y = d3.scaleLinear()
      .range([height, 60]);

    y.domain(d3.extent(averageData, d => d.sessionLength));

    // Draw the lines
    const line = d3.line()
      .x((d) => x(d.day))
      .y((d) => y(d.sessionLength))
      .curve(d3.curveBasis);

    // Add axis
    svg.append("g")
        .attr("transform", "translate(0," + (height*0.9) + ")")
        .call(d3.axisBottom(x))
        .attr("stroke-width", 0)
        .style("color", "rgba(255, 255, 255, 0.6)")
        .style("font-size", "small")
        .style("font-weight", "bold")
        .style("text-align", "center");
    
    // Add path to calculate line function
    svg.append("path")
        .datum(averageData)
        .attr("class", "line")
        .attr("d", line)
        .attr("stroke", "white")
        .attr("stroke-width", 2)
        .attr("fill", "none");
    
    svg.append("rect")
    .attr("class", "overlayBackground")
    .attr("width", width)
    .attr("height", height+50)
    .attr("opacity", 0.15)
    .attr("y", -50)

    const tooltip = addTooltip(svg)
    
    svg.append("rect")
    .attr("class", "overlay")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "transparent")
    .on("mouseover", function(event) { 
        tooltip.style("display", null);
    })
    .on("mouseout", function(event) {
        tooltip.style("display", "none");
    })
    .on("mousemove", mousemove);

    function mousemove(event){
      let position = d3.pointer(event)[0]
      x.invert = cursorPosition => xCoords[parseInt((cursorPosition+25)/15)]
      let bisecDay = d3.bisector(d => xCoords[d.day]).left
      let x0 = x.invert(position),
      i = bisecDay(averageData, x0),
      d = averageData[i];
      d3.select('.overlayBackground').attr("transform", `translate(${position}, 0)`)
      if(i >= averageData.length){ d = averageData[13] }
      if(i >= 0) {
        tooltip.attr("transform", "translate(" +position + "," + y(d.sessionLength) + ")");
          d3.select('#tooltip-close')
              .text(d.sessionLength + " min");
      }
    }

    let titlePath = svg.append("text").attr("fill", "white").style("color", "white").attr("opacity", 0.5)
    titlePath.append("tspan").text(chartTitle[0]).attr("y", 20).attr("x", 30)
    titlePath.append("tspan").text(chartTitle[1]).attr("x", 30).attr("dy", "1.95em")

  }, [data, width, height, margin.left, margin.right, margin.top]); // Redraw chart if data changes
 
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