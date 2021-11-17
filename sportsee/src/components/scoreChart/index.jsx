import React from "react";
import PropTypes from "prop-types"
import * as d3 from "d3";

import {GraphicContainer}  from "../../utils/style";


/**
 * component for displaying user score chart
 * @component
 * @param {number} data - user score in float format 
 * @example data : 0.17
 * @returns {object} GraphicContainer - styled component
 */
const ScoreChart = ({ data, dimensions }) => {
  const backgroundColor = "rgba(251, 251, 251, 1)"
  const containerWidth = 31
  const svgRef = React.useRef(null);
  const { width, height, margin } = dimensions.calculate((0.9*0.7*0.31), "width", 0.05, 0.05, 0.05, 0.05);
 
  React.useEffect(() => {

    // Create root container where we will append all other chart elements
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove(); // Clear svg content before adding new elements 
    const svg = svgEl.attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" 
        + width *0.47 + "," 
        + height / 2  + ")")
    
    // data preparation
    let score = data * 100
    const colors = [backgroundColor, "rgba(255, 0, 0, 1)"]
    var dataset = {things: [(100-score), score],};

    // d3 configuration
    var radius =( Math.min(width, height) *0.5);
    var pie = d3.pie().sort(null);
    var arc = d3.arc()
        .innerRadius(radius - 40)
        .outerRadius(radius - 50)
        .cornerRadius(50);

    // add title
    svg.append("text").text("Score").attr("transform", `translate(${-width*0.33}, ${-height*0.35})`)

    // add path and draw chart arcs
    svg.append("circle")
    .attr("cx",0)
    .attr("cy", 15)
    .attr("r",radius-50)
    .attr("fill", "white");
    svg.selectAll("path")
        .data(pie(dataset.things))
        .enter().append("path")
        .attr("transform", `translate(0, 15)`)
        .attr("fill", function(d, i) { return colors[i]; })
        .attr("d", arc);
        
    // add text
    let text = svg.append("text").attr("text-anchor", "middle")
    text.append("tspan")
    .attr("x", 0)
    .attr("y", -2.5)
    .style("font-size", `${width/10}px`)
    .style("font-weight", "bold")
    .text(`${score}%`)
    text.append("tspan")
    .attr("x", 0)
    .style("font-size", `${(width/10)*0.75}px`)
    .attr("dy", "1.95em")
    .attr("fill", "grey")
    .text(`de votre`)
    text.append("tspan")
    .attr("x", 0)
    .attr("dy", "1.5em")
    .style("font-size", `${(width/10)*0.75}px`)
    .attr("fill", "grey")
    .text(`objectif`)

  }, [data, margin.left, margin.right, margin.top, height, width]); // Redraw chart if data changes
 
  return (
    <GraphicContainer id="score" $bgColor={backgroundColor} $width={containerWidth}>
        <svg ref={svgRef} width={width} height={height} />
    </GraphicContainer>
  )
};

ScoreChart.propTypes = {
  data : PropTypes.number.isRequired
}
 
export default ScoreChart;