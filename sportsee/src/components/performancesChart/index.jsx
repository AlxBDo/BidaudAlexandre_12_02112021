import React from "react";
import PropTypes from "prop-types"
import * as d3 from "d3";

import {GraphicContainer}  from "../../utils/style";

/**
 * component for displaying user performances chart
 * @component
 * @param {object} data - object containing the data needed for the performances chart
 * @example data : { userId: <integer>, kind : <object>, data : <array> }
 * @example data.kind : { 1: <string> 'cardio', 2: <string> 'energy', 3: <string> 'endurance', 4: <string> 'strength', 5: <string> 'speed', 6: <string> 'intensity' }
 * @example data.data : [ { value: <integer>, kind : <integer> }, ... ]
 * @returns {object} GraphicContainer - styled component
 */
const PerformancesChart = ({ data, dimensions }) => {
  const backgroundColor = "rgba(40, 45, 48, 1)"
  const containerWidth = 31
  const svgRef = React.useRef(null);
  const { width, height, margin } = dimensions.calculate((0.9*0.7*0.31), "width", 0.05, 0.05, 0.05, 0.05);
 
  React.useEffect(() => {

    // Create root container where we will append all other chart elements
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove(); // Clear svg content before adding new elements 
    const svg = svgEl
      .append("g")
      .attr("transform", `translate(${width/4},${height/4})`);
      
    // Radius of radar chart
    const r = (width*0.9)/4
    

    // data preparation

    let frenchDimensions = ["Cardio", "Energie", "Endurance", "Force", "Vitesse", "Intensité"]
    const dimensions = Object.values(data.kind).map((d, i) => frenchDimensions[i]).reverse()
 
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
    
    // Mapping 0 - 255 to 0 - r
    const yScale = d3.scaleLinear()
      .range([0, r])
      .domain([0, values[0]])
    
    // customized tricks
    const ticks = tricksValues(values[0])

    // axis
    dimensions.forEach((dimension, i) => {
    const g = svg.append('g')
      .attr('transform', `translate(${r}, ${r}) rotate(${i * 60})`)
      .attr('stroke-width', 0)

    // Combining a left oriented axis with a right oriented axis
    // to make an axis with tick marks on both side
    g.append('g')
      .call(d3.axisLeft(yScale).tickFormat('').tickValues(ticks))
    g.append('g')
      .call(d3.axisRight(yScale).tickFormat('').tickValues(ticks))

    // Add a text label for each axis
    g.append('text')
      .text(dimension)
      .style("font-size", "small")
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
            performancesValues["Intensité"],
            performancesValues["Vitesse"],
            performancesValues["Force"],
            performancesValues["Endurance"],
            performancesValues["Energie"],
            performancesValues["Cardio"]
          ].map((v, i) => [Math.PI * 2 * i / 6 /* radian */, yScale(v) /* distance from the origin */])) 
        )
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

  }, [data, margin.left, margin.right, margin.top, margin.bottom, height, width]); // Redraw chart if data changes
 
  return (
    <GraphicContainer id="performances" $bgColor={backgroundColor} $width={containerWidth}>
        <svg ref={svgRef} width={width} height={height} />
    </GraphicContainer>
  )
};

PerformancesChart.propTypes = {
  data : PropTypes.object.isRequired
}
 
export default PerformancesChart;