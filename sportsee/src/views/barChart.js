import React from "react";
import * as d3 from "d3";

function topRoundedColumn(x, y, height, width) {
  const radius = width / 2;
  const heightBeforeArc = height - radius;
  return (
    `M${x-11.76},${y} ` + // Mx,y Move the pen to(x, y)
    `v-${heightBeforeArc} ` + // h<length> Draw a vertical line of length <height>px
    `a ${radius},${radius} 0 0 1 ${radius},-${radius} ` + // arc
    `a ${radius},${radius} 0 0 1 ${radius},${radius} ` +
    `v${heightBeforeArc} ` +
    `z` // close shape
  );
}
 
const BarChart = ({ data, dimensions }) => {
  const svgRef = React.useRef(null);
  const { width, height, margin } = dimensions;
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;
  const div = d3.select("body").append("div")
    .attr("class", "tooltip")         
    .style("opacity", 0);
 
  React.useEffect(() => {
    const xScale = d3.scaleBand()
    .range([0, width])
    .padding(0.1)
    .domain(data.map((d) => d.day));
    const yScale = d3.scaleLinear().range([height, 0]).domain([0, d3.max(data, d => d.value)]);
    // Create root container where we will append all other chart elements
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove(); // Clear svg content before adding new elements 
    const svg = svgEl
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
   // Add X grid lines with labels
   const xAxis = d3.axisBottom(xScale).tickSize(0);
   const xAxisGroup = svg.append("g")
     .attr("transform", `translate(0, ${height})`)
     .attr("stroke-width", "0")
     .call(xAxis);
   xAxisGroup.selectAll("text")
     .style("text-anchor", "end")
     .style("color", "#9B9EAC")
     .style("font-size", "14px")
     .style("font-weight", "bold")
     .attr("dx", "-3.5em")
     .attr("dy", "1.5em");
    // Add Y grid lines with labels
    const yAxis = d3.axisRight(yScale).ticks(3).tickSize(-width + margin.right);
    const yAxisGroup = svg.append("g").attr("transform", `translate(${width}, 0)`).attr("stroke-width", "0").call(yAxis);
    yAxisGroup.selectAll("line")
      .attr("transform", `translate(${-margin.right}, 0)`)
      .attr("stroke", "#DEDEDE")
      .attr("stroke-width", "1")
      .style("stroke-dasharray", "2 2");
    // Add the bars
    svg.selectAll(".bar")
      .data(data)
      .enter().append("path")
      .attr("class", "bar")
      .attr("x", d => xScale(d.day))
      .style("transform", d => d.type === "calories" ? 'translateX(15px)' : 0)
      .attr("y", d => yScale(d.value))
      .attr("d", d => topRoundedColumn(xScale(d.day), height, height - yScale(d.value), 7))
      .attr("fill", d => d.type === "kilogram" ? "#282D30" : "#E60000")
      .attr("height", d => height - yScale(d.value))		
      .on("mouseover", function(event, d) {
          div.transition()        
              .duration(200)      
              .style("opacity", .9);
            div.html(d.type + " : " + d.value)
              .style("left", (event.pageX + 10) + "px")     
              .style("top", (event.pageY - 50) + "px");
      })
      .on("mouseout", function(event, d) {
          div.transition()
              .duration(500)
              .style("opacity", 0);
    });
    
  }, [data]); // Redraw chart if data changes
 
  return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
};
 
export default BarChart;