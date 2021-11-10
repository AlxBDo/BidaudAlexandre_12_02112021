import React from "react";
import * as d3 from "d3";

import chartDimensions from "../utils/chartDimensions";
import {GraphicContainer}  from "../utils/style";


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


 
function DailyActivityGraph({ data }) {
  const backgroundColor = "#FBFBFB"
  const containerWidth = "96%"
  const svgRef = React.useRef(null);
  const { width, height, margin } = chartDimensions.calculate(0.5, 320);
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;
  const div = d3.select("body").append("div")
    .attr("class", "tooltip")         
    .style("opacity", 0);
  React.useEffect(() => {
    const xScale = d3.scaleBand()
    .range([0, width])
    .padding(0.1)
    .domain(data.map((d) => d.day.substring(9)));
    const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([0, d3.max(data, d => d.kilogram > d.calories ? d.kilogram : d.calories+100)]);
    // Create root container where we will append all other chart elements
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove(); // Clear svg content before adding new elements 
    const svg = svgEl
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top+25})`);

   // Add X grid lines with labels
   const xAxis = d3.axisBottom(xScale).tickSize(0);
   const xAxisGroup = svg.append("g")
     .attr("transform", `translate(0, ${height})`)
     .attr("color", "#DEDEDE")
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
    const yAxisGroup = svg.append("g")
    .attr("transform", `translate(${width}, 0)`)
    .attr("stroke-width", "0").call(yAxis);
    yAxisGroup.selectAll("line")
      .attr("transform", `translate(${-margin.right}, 0)`)
      .attr("stroke", "#DEDEDE")
      .attr("stroke-width", "1")
      .style("stroke-dasharray", "2 2");

    // Add the day bar
    svg.selectAll(".day")
      .data(data)
      .enter().append("path")
      .attr("class", "day")
      .attr("d", d => `M${xScale(d.day.substring(9))-28.76},${height} ` + // Mx,y Move the pen to(x, y)
      `v-${height - yScale(d.calories) + 20} ` +  // arc
      `a ${width},0 1 1 1 56,0  ` +
      `v${height- yScale(d.calories)+20} ` +
      `z`)
      .attr("fill", "transparent")
      .attr("height", d => height - yScale(d.kilogram))
      .style("position", "relative")
      .style("z-index", 9)
      .on("mouseover", (event, d) => {
          div.transition()        
              .duration(200)      
              .style("opacity", .9);
            div.html("<p>"+d.kilogram + "kg</p><p>" + d.calories + "Kcal</p>")
              .style("left", (event.pageX + 10) + "px")     
              .style("top", (event.pageY - 50) + "px");
      })
      .on("mouseout", (event, d) => {
          div.transition()
              .duration(500)
              .style("opacity", 0);
    });
    
    // Add the kilogram bars
    svg.selectAll(".bar.kilogram")
      .data(data)
      .enter().append("path")
      .attr("class", "kilogram")
      .attr("x", d => xScale('kilogram'))
      .attr("y", d => yScale(d.kilogram))
      .attr("d", d => topRoundedColumn(xScale(d.day.substring(9)), height, height - yScale(d.kilogram), 7))
      .attr("fill", "#282D30")
      .attr("height", d => height - yScale(d.kilogram))
      .style("position", "relative")
      .style("z-index", 1);

    // Add the bars
    svg.selectAll(".bar.calories")
      .data(data)
      .enter().append("path")
      .attr("class", "calories")
      .attr("x", d => xScale('calories'))
      .style("transform", 'translateX(15px)')
      .attr("y", d => yScale(d.calories))
      .attr("d", d => topRoundedColumn(xScale(d.day.substring(9)), height, height - yScale(d.calories), 7))
      .attr("fill", "#E60000")
      .attr("height", d => height - yScale(d.calories))
      .style("position", "relative")
      .style("z-index", 1);

    // add title   
    var title = svg.append("g")
    .attr("id", "daily-activity-graphic-title")
    .attr("x", 65)
    .attr("y", 25)
    .attr("height", 100)
    .attr("width", 150)
    .style("transform", 'translateY(-30px)');
    title.append("text")
    .text("Activité quotidienne")
    .style("font-weight", "bold")
    .style("font-size", "large");

    // add legend   
    var legend = svg.append("g")
    .attr("class", "legend")
    .attr("x", width - 65)
    .attr("y", 25)
    .attr("height", 100)
    .attr("width", 100)
    .style("transform", 'translateY(-30px)');
    legend.selectAll('g').data(["Poids (kg)", "Calories brûlées (kCal)"])
      .enter()
      .append('g')
      .each(function(d, i){
        var g = d3.select(this);
        g.append("circle")
          .attr("cx", ((width * 0.65)+(125*i)))
          .attr("cy", 0)
          .attr("r", 4)
          .style("fill", i === 0 ? "#282D30" : "#E60000");
        g.append("text")
          .attr("x", ((width * 0.65)+10+(125*i)))
          .attr("y", 4)
          .attr("height",30)
          .attr("width",100)
          .style("fill", "rgb(116, 121, 140)")
          .text(d);

      });
    
  }, [data, div, width, height, margin.left, margin.right, margin.top]); // Redraw chart if data changes
 
  return (
    <GraphicContainer id="daily-activity-graph" $bgColor={backgroundColor} $width={containerWidth}>
        <svg ref={svgRef} width={svgWidth} height={svgHeight} />
    </GraphicContainer>
  )
};
 
export default DailyActivityGraph;