import React from "react";

import * as d3 from "d3";

import chartDimensions from "../utils/chartDimensions";
import {GraphicContainer}  from "../utils/style";

 
const PerformancesChart = ({ data }) => {
  const backgroundColor = "rgba(40, 45, 48, 1)"
  const containerWidth = 31
  const svgRef = React.useRef(null);
  const { width, height, margin } = chartDimensions.calculate(0.15, 285, 25, 25, 5, 25);
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;
 
  React.useEffect(() => {
    // Create root container where we will append all other chart elements
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove(); // Clear svg content before adding new elements 
    const svg = svgEl
      .append("g")
      .attr("transform", `translate(${margin.left*2},${margin.top*2})`);
      
    // Radius of radar chart
  const r = 85
  
  const dimensions = Object.values(data.kind)
  let values = data.data.reduce((a, k) => {
    a.push(k.value)
    return a
  }, []).sort((a, b) => {return b - a})
  const tricksValues = (maxValue) => { 
    let ticksArray = []
    for(let i = 0; i < 7 ; i++){ ticksArray.push(parseInt((maxValue/6) * i)) }
    return ticksArray
  }

  let performancesValues = data.data.reduce((a, k) => Object.assign(a, {[dimensions[(k.kind - 1)]]: k.value}), {})
  
  // Line generator for radial lines
  const radialLine = d3.lineRadial()
  
  // Radar chart is a circle, the length of each axis is the radius of the circle
  // Mapping 0 - 255 to 0 - r
  const yScale = d3.scaleLinear()
    .range([0, r])
    .domain([0, values[0]])
  
  // The default tick marks is not ideal, override it with a customized one
  const ticks = tricksValues(values[0])
  // One axis for each dimension
  dimensions.forEach((dimension, i) => {
    // We first build an axis at the origin, enclosed inside an "g" element
    // then transform it to the right position and right orientation
    const g = svg.append('g')
      .attr('transform', `translate(${r}, ${r}) rotate(${i * 60})`)
      .attr('stroke-width', 0)

    // Combining a left oriented axis with a right oriented axis
    // to make an axis with tick marks on both side
    // Reminded that, these are "g" elements inside the outer "g" element
    // and will be transformed to the right position with its parent element
    g.append('g')
      .call(d3.axisLeft(yScale).tickFormat('').tickValues(ticks))
    g.append('g')
      .call(d3.axisRight(yScale).tickFormat('').tickValues(ticks))

    // Add a text label for each axis, put it at the edge
    // Again, this "text" element is inside the outer "g" element,
    // and will be transformed to the right position with its parent element
    g.append('text')
      .text(dimension)
      .style("color", "white")
      .attr("fill", "white")
      .attr("class", "categories")
      .attr('text-anchor', i === 0 || i === 3 ? 'middle' : i < 3 ? "start" : "end")
      .attr('transform', `translate(0, -${r + 10}) rotate(${i * -60})`)
  })
  
  // Line for the base stats of Snorlax
  svg.append('g')
    .selectAll('path')
    .data([performancesValues])
    .enter()
    .append('path')
      .attr('d', radialLine([
          performancesValues.cardio,
          performancesValues.energy,
          performancesValues.endurance,
          performancesValues.strength,
          performancesValues.speed,
          performancesValues.intensity,
          performancesValues.cardio // hp again to close the loop
        ].map((v, i) => [Math.PI * 2 * i / 6 /* radian */, yScale(v) /* distance from the origin */])) 
      )
      // Move to the center
      .attr('transform', `translate(${r}, ${r})`)
      .attr('fill', 'rgba(255, 1, 1, 0.7)');
  
  // Gird lines for references
  svg.append('g')
    .selectAll('path')
    .data(ticks)
    .enter()
    .append('path')
      .attr('d', d => radialLine(ticks.map((v, i) => [Math.PI * 2 * i / 6, yScale(d)])))
      .attr('transform', `translate(${r}, ${r})`)
      .attr('stroke', 'white')
      .attr('opacity', 0.5)
      .attr('fill', 'transparent')

  }, [data, margin.left, margin.right, margin.top]); // Redraw chart if data changes
 
  return (
    <GraphicContainer id="performances" $bgColor={backgroundColor} $width={containerWidth}>
        <svg ref={svgRef} width={svgWidth} height={svgHeight} />
    </GraphicContainer>
  )
};
 
export default PerformancesChart;