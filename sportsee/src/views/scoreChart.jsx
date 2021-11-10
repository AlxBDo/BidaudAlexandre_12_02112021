import React from "react";
import * as d3 from "d3";

import chartDimensions from "../utils/chartDimensions";
import {GraphicContainer}  from "../utils/style";

 
const ScoreChart = ({ data }) => {
  const backgroundColor = "rgba(251, 251, 251, 1)"
  const containerWidth = 31
  const svgRef = React.useRef(null);
  const { width, height, margin } = chartDimensions.calculate(0.15, 285, 25, 25, 25, 25);
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;
 
  React.useEffect(() => {
    // Create root container where we will append all other chart elements
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove(); // Clear svg content before adding new elements 
    const svg = svgEl.attr("width", width)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", "translate(" 
        + width / 2.090 + "," 
        + svgHeight / 2  + ")")
    let score = data * 100
    const colors = [backgroundColor, "rgba(255, 0, 0, 1)"]
    var dataset = {things: [(100-score), score],};
    var radius = Math.min(svgWidth, svgHeight) / 2;
    var pie = d3.pie().sort(null);
    var arc = d3.arc()
        .innerRadius(radius - 35)
        .outerRadius(radius - 50)
        .cornerRadius(10);
    svg.selectAll("path")
        .data(pie(dataset.things))
        .enter().append("path")
        .attr("fill", function(d, i) { return colors[i]; })
        .attr("d", arc);
    svg.append("circle")
    .attr("cx",0)
    .attr("cy",0)
    .attr("r",(width - (margin.left + margin.right))*0.39)
    .attr("fill", "white");
    // add text
    let text = svg.append("text").attr("text-anchor", "middle")
    text.append("tspan")
    .attr("x", 0)
    .attr("y", -10)
    .style("font-size", "30px")
    .style("font-weight", "bold")
    .text(`${score}%`)
    text.append("tspan")
    .attr("x", 0)
    .attr("dy", "1.95em")
    .attr("fill", "grey")
    .text(`de votre`)
    text.append("tspan")
    .attr("x", 0)
    .attr("dy", "1.5em")
    .attr("fill", "grey")
    .text(`objectif`)

  }, [data, margin.left, margin.right, margin.top, svgHeight, width, svgWidth]); // Redraw chart if data changes
 
  return (
    <GraphicContainer id="score" $bgColor={backgroundColor} $width={containerWidth}>
        <svg ref={svgRef} width={svgWidth} height={svgHeight} />
    </GraphicContainer>
  )
};
 
export default ScoreChart;