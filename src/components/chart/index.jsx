import React from "react";
import PropTypes from "prop-types"

import * as d3 from "d3";

import chartDimensions from "../../utils/chartDimensions";
import {GraphicContainer}  from "../../utils/style";
import averageSessions from "./averageSession";
import dailyActivity from "./dailyActivity";
import performances from "./performances";
import score from "./score"


/**
 * provides the constants needed to create the chart
 * @param {string} backgroundColor - chart container background
 * @param {function} chartFunction - function called to create chart
 * @param {number} containerWidth 
 * @param {number} height 
 * @param {number} width 
 * @param {number} marginTop 
 * @param {number} marginRight 
 * @param {number} marginBottom 
 * @param {number} marginLeft 
 * @returns {object} constants
 * @example { backgroundColor, chartFunction, containerWidth, dimensions }
 * @returns {object} constants.dimensions - contains attributes : marginTop, marginRight, marginBottom, marginLeft
 */
function getChartConst(
  backgroundColor, 
  chartFunction,
  containerWidth, 
  height, 
  width, 
  marginTop, 
  marginRight, 
  marginBottom, 
  marginLeft
){
  const dimensions = { width: width, height: height}
  if(marginTop) { dimensions.marginTop = marginTop}
  if(marginRight) { dimensions.marginRight = marginRight}
  if(marginBottom) { dimensions.marginBottom = marginBottom}
  if(marginLeft) { dimensions.marginLeft = marginLeft}
  return { backgroundColor, chartFunction, containerWidth, dimensions }
}

/**
 * provides charts parameters 
 * @param {string} chartName 
 * @returns {object} constants - @see getChartConst()
 */
function chartParamManager(chartName){
  switch(chartName){
    case "averageSessions" : 
      return getChartConst("#F00", averageSessions, 31, "width", 0.9*0.7*0.31 )
    case "dailyActivity" : 
      return getChartConst("#FBFBFB", dailyActivity, "96%", 320, 0.9*0.6, 0.05, 0.05, 0.05, 0.05 )
    case "performances" : 
      return getChartConst("rgba(40, 45, 48, 1)", performances, 31, "width", 0.9*0.7*0.31, 0.01, 0.01, 0.01, 0.01 )
    case "score" : 
      return getChartConst("rgba(251, 251, 251, 1)", score, 31, "width", 0.9*0.7*0.31, 0.05, 0.05, 0.05, 0.05 )
    default : 
      console.error(`No parameter found for the graph ${chartName}`)
  }
} 


Chart.propTypes = {
  data : PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array
  ]),
  name : PropTypes.string.isRequired
}

/**
 * display chart
 * @component
 * @param {array} data - array of objects with day and sessionLength attributes
 * @param {string} name - chart name
 * @returns {object} GraphicContainer - styled component
 */
function Chart({ data, name }){  

  const {backgroundColor, chartFunction, containerWidth, dimensions} = chartParamManager(name)
  const { width, height, margin } = chartDimensions.calculate(
      dimensions.width, 
      dimensions.height,
      dimensions.marginTop ? dimensions.marginTop : null,
      dimensions.marginRight ? dimensions.marginRight : null,
      dimensions.marginBottom ? dimensions.marginBottom : null,
      dimensions.marginLeft ? dimensions.marginLeft : null,
  )

  const svgRef = React.useRef(null)
 
  React.useEffect(() => {
    
    // Create root container where we will append chart
    const svgEl = d3.select(svgRef.current);
    const svg = svgEl.append("g");

    chartFunction(data, height, svg, width, name  === "score" ? backgroundColor : margin)

  }, [backgroundColor, chartFunction, data, height, margin, name, svgRef, width]); // Redraw chart if data changes
 
  return (
    <GraphicContainer id={`${name}Chart`} $bgColor={backgroundColor} $width={containerWidth}>
        <svg ref={svgRef} width={width} height={height} />
    </GraphicContainer>
  )
};

export default Chart;